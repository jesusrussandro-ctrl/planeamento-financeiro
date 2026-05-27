from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import send_json


MES_PADRAO = "2026-05"


def garantir_estruturas():
    dashboard_data.setdefault("rendimentos", [])
    dashboard_data.setdefault("despesas", [])
    dashboard_data.setdefault("dividas", [])
    dashboard_data.setdefault("objetivos", [])
    dashboard_data.setdefault("pagamentos", [])
    dashboard_data.setdefault("pagamentosDividas", [])


def filtrar_por_mes(lista, mes):
    if not mes:
        return lista
    return [item for item in lista if item.get("mes") == mes]


def proximo_id(lista):
    if not lista:
        return 1
    return max(int(item.get("id", 0)) for item in lista) + 1


def encontrar_item_por_id(lista, item_id):
    for item in lista:
        if int(item.get("id", 0)) == int(item_id):
            return item
    return None


def normalizar_numero(valor, padrao=0):
    try:
        if valor is None or valor == "":
            return float(padrao)

        if isinstance(valor, (int, float)):
            return float(valor)

        texto = str(valor).strip()
        texto = texto.replace("€", "").replace("%", "").replace(" ", "")

        # Suporta formatos PT: 1.234,56 e também 1234.56
        if "," in texto and "." in texto:
            texto = texto.replace(".", "").replace(",", ".")
        elif "," in texto:
            texto = texto.replace(",", ".")

        return float(texto)
    except Exception:
        return float(padrao)


def normalizar_mes(mes):
    return mes or MES_PADRAO


def meses_ate(mes_inicio, mes_final):
    if not mes_inicio or not mes_final:
        return []

    ano_inicio, mes_inicio_num = [int(x) for x in mes_inicio.split("-")]
    ano_final, mes_final_num = [int(x) for x in mes_final.split("-")]

    atual_ano = ano_inicio
    atual_mes = mes_inicio_num
    meses = []

    while (atual_ano, atual_mes) <= (ano_final, mes_final_num):
        meses.append(f"{atual_ano:04d}-{atual_mes:02d}")
        atual_mes += 1

        if atual_mes > 12:
            atual_mes = 1
            atual_ano += 1

    return meses


def extrair_taxa_juros(dados):
    if "taxaJuros" in dados:
        return normalizar_numero(dados.get("taxaJuros"), 0)

    if "juros" in dados:
        return normalizar_numero(dados.get("juros"), 0)

    return 0


def calcular_taxa_mensal(divida):
    tipo_juros = str(divida.get("tipoJuros", "mensal")).lower()
    taxa_juros = normalizar_numero(divida.get("taxaJuros", divida.get("juros", 0)), 0)

    if tipo_juros == "anual":
        return ((1 + taxa_juros / 100) ** (1 / 12)) - 1

    return taxa_juros / 100


def pagamentos_da_divida_ate_mes(divida_id, mes_consulta):
    pagamentos = [
        pagamento for pagamento in dashboard_data.get("pagamentosDividas", [])
        if int(pagamento.get("dividaId", 0)) == int(divida_id)
        and pagamento.get("mes", MES_PADRAO) <= mes_consulta
    ]

    pagamentos.sort(key=lambda item: (item.get("mes", MES_PADRAO), int(item.get("id", 0))))
    return pagamentos


def calcular_saldo_divida_no_mes(divida, mes_consulta):
    """
    Calcula o estado da dívida em qualquer mês com base no saldo inicial
    e em todos os pagamentos registados até esse mês.

    Regras:
    - se não houver pagamento num mês, o saldo transita igual;
    - se houver pagamento, calcula juros, amortização e novo saldo;
    - se a dívida for paga no mês consultado, aparece com saldo 0 e status "paga";
    - se a dívida já foi paga antes do mês consultado, não aparece.
    """
    mes_consulta = normalizar_mes(mes_consulta)
    mes_inicio = divida.get("mesInicio", divida.get("mes", MES_PADRAO))

    if mes_consulta < mes_inicio:
        return None

    saldo = normalizar_numero(divida.get("saldoInicial", divida.get("saldo", 0)), 0)
    taxa_mensal = calcular_taxa_mensal(divida)
    mes_quitacao = None

    pagamentos = pagamentos_da_divida_ate_mes(divida.get("id"), mes_consulta)

    for pagamento in pagamentos:
        mes_pagamento = pagamento.get("mes", MES_PADRAO)

        if saldo <= 0:
            mes_quitacao = mes_pagamento
            break

        valor_pago = normalizar_numero(pagamento.get("valorPago"), 0)
        juros_pago = round(saldo * taxa_mensal, 2)
        amortizacao = round(max(0, valor_pago - juros_pago), 2)

        # Se o pagamento for superior ao necessário, limita a amortização ao saldo.
        amortizacao = min(amortizacao, saldo)

        saldo_antes = round(saldo, 2)
        saldo_depois = round(max(0, saldo - amortizacao), 2)

        pagamento["saldoAntes"] = saldo_antes
        pagamento["jurosPago"] = juros_pago
        pagamento["amortizacao"] = amortizacao
        pagamento["saldoDepois"] = saldo_depois

        saldo = saldo_depois

        if saldo <= 0:
            mes_quitacao = mes_pagamento
            break

    # Se foi quitada antes do mês consultado, não transita.
    if mes_quitacao and mes_quitacao < mes_consulta:
        return None

    status = "paga" if saldo <= 0 else "ativa"

    taxa_juros = normalizar_numero(divida.get("taxaJuros", divida.get("juros", 0)), 0)
    tipo_juros = divida.get("tipoJuros", "mensal")

    return {
        **divida,
        "mes": mes_consulta,
        "saldo": round(saldo, 2),
        "saldoAtual": round(saldo, 2),
        "saldoInicial": round(normalizar_numero(divida.get("saldoInicial", divida.get("saldo", 0)), 0), 2),
        "prestacaoMensal": round(normalizar_numero(divida.get("prestacaoMensal", 0), 0), 2),
        "tipoJuros": tipo_juros,
        "taxaJuros": taxa_juros,
        "juros": f"{taxa_juros}%",
        "status": status,
    }


def listar_dividas_do_mes(mes):
    garantir_estruturas()
    mes = normalizar_mes(mes)
    dividas_calculadas = []

    for divida in dashboard_data.get("dividas", []):
        # Status "cancelada" permite remover da projeção sem apagar histórico.
        if divida.get("status") == "cancelada":
            continue

        divida_mes = calcular_saldo_divida_no_mes(divida, mes)

        if divida_mes:
            dividas_calculadas.append(divida_mes)

    return dividas_calculadas


def normalizar_divida(dados):
    saldo_inicial = normalizar_numero(dados.get("saldoInicial", dados.get("saldo", 0)), 0)
    saldo = normalizar_numero(dados.get("saldo", saldo_inicial), saldo_inicial)
    taxa_juros = extrair_taxa_juros(dados)

    return {
        **dados,
        "mesInicio": dados.get("mesInicio", dados.get("mes", MES_PADRAO)),
        "saldoInicial": saldo_inicial,
        "saldo": saldo,
        "prestacaoMensal": normalizar_numero(dados.get("prestacaoMensal", 0), 0),
        "tipoJuros": dados.get("tipoJuros", "mensal"),
        "taxaJuros": taxa_juros,
        "juros": f"{taxa_juros}%",
        "progresso": normalizar_numero(dados.get("progresso", 0), 0),
        "prioridade": dados.get("prioridade", "Baixa"),
        "status": dados.get("status", "ativa"),
    }


def recalcular_pagamentos_divida(divida_id):
    """
    Recalcula todos os pagamentos de uma dívida após inserir, editar ou apagar
    um pagamento, garantindo que todos os meses seguintes ficam corretos.
    """
    divida = encontrar_item_por_id(dashboard_data.get("dividas", []), divida_id)
    if not divida:
        return

    pagamentos = [
        pagamento for pagamento in dashboard_data.get("pagamentosDividas", [])
        if int(pagamento.get("dividaId", 0)) == int(divida_id)
    ]

    pagamentos.sort(key=lambda item: (item.get("mes", MES_PADRAO), int(item.get("id", 0))))

    saldo = normalizar_numero(divida.get("saldoInicial", divida.get("saldo", 0)), 0)
    taxa_mensal = calcular_taxa_mensal(divida)

    for pagamento in pagamentos:
        if saldo <= 0:
            pagamento["saldoAntes"] = 0
            pagamento["jurosPago"] = 0
            pagamento["amortizacao"] = 0
            pagamento["saldoDepois"] = 0
            continue

        valor_pago = normalizar_numero(pagamento.get("valorPago"), 0)
        juros_pago = round(saldo * taxa_mensal, 2)
        amortizacao = round(max(0, valor_pago - juros_pago), 2)
        amortizacao = min(amortizacao, saldo)

        saldo_antes = round(saldo, 2)
        saldo_depois = round(max(0, saldo - amortizacao), 2)

        pagamento["saldoAntes"] = saldo_antes
        pagamento["jurosPago"] = juros_pago
        pagamento["amortizacao"] = amortizacao
        pagamento["saldoDepois"] = saldo_depois

        saldo = saldo_depois


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        send_json(self, {"status": "ok"})

    def do_GET(self):
        garantir_estruturas()

        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)
        mes = query.get("mes", [None])[0]

        if path == "/api/dashboard":
            send_json(self, {
                "status": "ok",
                "data": {
                    **dashboard_data,
                    "rendimentos": filtrar_por_mes(dashboard_data.get("rendimentos", []), mes),
                    "despesas": filtrar_por_mes(dashboard_data.get("despesas", []), mes),
                    "dividas": listar_dividas_do_mes(mes),
                    "objetivos": filtrar_por_mes(dashboard_data.get("objetivos", []), mes),
                    "pagamentos": filtrar_por_mes(dashboard_data.get("pagamentos", []), mes),
                    "pagamentosDividas": filtrar_por_mes(dashboard_data.get("pagamentosDividas", []), mes),
                }
            })
            return

        if path == "/api/dividas":
            send_json(self, {
                "status": "ok",
                "data": listar_dividas_do_mes(mes)
            })
            return

        routes = {
            "/api/rendimentos": dashboard_data.get("rendimentos", []),
            "/api/despesas": dashboard_data.get("despesas", []),
            "/api/objetivos": dashboard_data.get("objetivos", []),
            "/api/pagamentos": dashboard_data.get("pagamentos", []),
            "/api/pagamentos-dividas": dashboard_data.get("pagamentosDividas", []),
        }

        if path in routes:
            send_json(self, {
                "status": "ok",
                "data": filtrar_por_mes(routes[path], mes)
            })
        else:
            send_json(self, {
                "status": "error",
                "message": "Rota não encontrada"
            }, 404)

    def do_POST(self):
        garantir_estruturas()

        path = urlparse(self.path).path
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            dados = json.loads(body.decode("utf-8")) if body else {}
        except Exception:
            dados = {}

        if "mes" not in dados:
            dados["mes"] = MES_PADRAO

        if path == "/api/rendimentos":
            dados["id"] = proximo_id(dashboard_data["rendimentos"])
            dashboard_data["rendimentos"].append(dados)

            send_json(self, {
                "status": "ok",
                "message": "Rendimento adicionado com sucesso",
                "data": dados
            }, 201)

        elif path == "/api/despesas":
            dados["id"] = proximo_id(dashboard_data["despesas"])
            dashboard_data["despesas"].append(dados)

            send_json(self, {
                "status": "ok",
                "message": "Despesa adicionada com sucesso",
                "data": dados
            }, 201)

        elif path == "/api/dividas":
            dados["id"] = proximo_id(dashboard_data["dividas"])
            dados = normalizar_divida(dados)
            dashboard_data["dividas"].append(dados)

            send_json(self, {
                "status": "ok",
                "message": "Dívida adicionada com sucesso",
                "data": calcular_saldo_divida_no_mes(dados, dados.get("mesInicio", MES_PADRAO))
            }, 201)

        elif path == "/api/pagamentos-dividas":
            divida_id = int(dados.get("dividaId", 0))
            mes = dados.get("mes", MES_PADRAO)
            valor_pago = normalizar_numero(dados.get("valorPago"), 0)

            divida = encontrar_item_por_id(dashboard_data["dividas"], divida_id)

            if not divida:
                send_json(self, {
                    "status": "error",
                    "message": "Dívida não encontrada"
                }, 404)
                return

            if mes < divida.get("mesInicio", divida.get("mes", MES_PADRAO)):
                send_json(self, {
                    "status": "error",
                    "message": "Não é possível registar pagamento antes do início da dívida"
                }, 400)
                return

            # Permite apenas um pagamento por dívida/mês. Se já existir, atualiza o valor.
            pagamento_existente = None
            for pagamento in dashboard_data["pagamentosDividas"]:
                if (
                    int(pagamento.get("dividaId", 0)) == divida_id
                    and pagamento.get("mes") == mes
                ):
                    pagamento_existente = pagamento
                    break

            if pagamento_existente:
                pagamento_existente["valorPago"] = round(valor_pago, 2)
                pagamento = pagamento_existente
            else:
                pagamento = {
                    "id": proximo_id(dashboard_data["pagamentosDividas"]),
                    "dividaId": divida_id,
                    "mes": mes,
                    "valorPago": round(valor_pago, 2),
                    "jurosPago": 0,
                    "amortizacao": 0,
                    "saldoAntes": 0,
                    "saldoDepois": 0,
                }
                dashboard_data["pagamentosDividas"].append(pagamento)

            recalcular_pagamentos_divida(divida_id)

            send_json(self, {
                "status": "ok",
                "message": "Pagamento de dívida registado com sucesso",
                "data": pagamento,
                "divida": calcular_saldo_divida_no_mes(divida, mes)
            }, 201)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota POST não encontrada"
            }, 404)

    def do_PUT(self):
        garantir_estruturas()

        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)
        item_id = int(query.get("id", [0])[0])

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            dados = json.loads(body.decode("utf-8")) if body else {}
        except Exception:
            dados = {}

        if path == "/api/rendimentos":
            item = encontrar_item_por_id(dashboard_data["rendimentos"], item_id)

            if not item:
                send_json(self, {
                    "status": "error",
                    "message": "Rendimento não encontrado"
                }, 404)
                return

            item["mes"] = dados.get("mes", item.get("mes", MES_PADRAO))
            item["fonte"] = dados.get("fonte", item["fonte"])
            item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
            item["recebido"] = dados.get("recebido", item["recebido"])

            send_json(self, {
                "status": "ok",
                "message": "Rendimento atualizado com sucesso",
                "data": item
            })

        elif path == "/api/despesas":
            item = encontrar_item_por_id(dashboard_data["despesas"], item_id)

            if not item:
                send_json(self, {
                    "status": "error",
                    "message": "Despesa não encontrada"
                }, 404)
                return

            item["mes"] = dados.get("mes", item.get("mes", MES_PADRAO))
            item["categoria"] = dados.get("categoria", item["categoria"])
            item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
            item["realizado"] = dados.get("realizado", item["realizado"])
            item["percentagem"] = dados.get("percentagem", item.get("percentagem", "0%"))

            send_json(self, {
                "status": "ok",
                "message": "Despesa atualizada com sucesso",
                "data": item
            })

        elif path == "/api/dividas":
            item = encontrar_item_por_id(dashboard_data["dividas"], item_id)

            if not item:
                send_json(self, {
                    "status": "error",
                    "message": "Dívida não encontrada"
                }, 404)
                return

            item.update(dados)
            item.update(normalizar_divida(item))

            recalcular_pagamentos_divida(item_id)

            mes_referencia = dados.get("mes", item.get("mesInicio", MES_PADRAO))

            send_json(self, {
                "status": "ok",
                "message": "Dívida atualizada com sucesso",
                "data": calcular_saldo_divida_no_mes(item, mes_referencia)
            })

        elif path == "/api/pagamentos-dividas":
            pagamento = encontrar_item_por_id(dashboard_data["pagamentosDividas"], item_id)

            if not pagamento:
                send_json(self, {
                    "status": "error",
                    "message": "Pagamento de dívida não encontrado"
                }, 404)
                return

            pagamento["mes"] = dados.get("mes", pagamento.get("mes", MES_PADRAO))
            pagamento["valorPago"] = round(normalizar_numero(dados.get("valorPago", pagamento.get("valorPago", 0)), 0), 2)

            recalcular_pagamentos_divida(pagamento.get("dividaId"))

            send_json(self, {
                "status": "ok",
                "message": "Pagamento de dívida atualizado com sucesso",
                "data": pagamento
            })

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota PUT não encontrada"
            }, 404)

    def do_DELETE(self):
        garantir_estruturas()

        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)
        item_id = int(query.get("id", [0])[0])

        listas = {
            "/api/rendimentos": (dashboard_data["rendimentos"], "Rendimento"),
            "/api/despesas": (dashboard_data["despesas"], "Despesa"),
            "/api/dividas": (dashboard_data["dividas"], "Dívida"),
            "/api/pagamentos-dividas": (dashboard_data["pagamentosDividas"], "Pagamento de dívida"),
        }

        if path not in listas:
            send_json(self, {
                "status": "error",
                "message": "Rota DELETE não encontrada"
            }, 404)
            return

        lista, nome = listas[path]
        item = encontrar_item_por_id(lista, item_id)

        if not item:
            send_json(self, {
                "status": "error",
                "message": f"{nome} não encontrado"
            }, 404)
            return

        lista.remove(item)

        if path == "/api/pagamentos-dividas":
            recalcular_pagamentos_divida(item.get("dividaId"))

        send_json(self, {
            "status": "ok",
            "message": f"{nome} apagado com sucesso",
            "data": item
        })
