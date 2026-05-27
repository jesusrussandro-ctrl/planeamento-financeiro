from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import send_json


MES_PADRAO = "2026-05"


def filtrar_por_mes(lista, mes):
    if not mes:
        return lista
    return [item for item in lista if item.get("mes") == mes]


def proximo_id(lista):
    if not lista:
        return 1
    return max(int(item.get("id", 0)) for item in lista) + 1


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


def calcular_taxa_mensal(divida):
    tipo_juros = str(divida.get("tipoJuros", "mensal")).lower()
    taxa_juros = float(divida.get("taxaJuros", 0) or 0)

    if tipo_juros == "anual":
        return ((1 + taxa_juros / 100) ** (1 / 12)) - 1

    return taxa_juros / 100


def calcular_saldo_divida_no_mes(divida, mes):
    mes_inicio = divida.get("mesInicio", divida.get("mes", MES_PADRAO))

    if mes and mes < mes_inicio:
        return None

    saldo = float(divida.get("saldoInicial", divida.get("saldo", 0)) or 0)
    taxa_mensal = calcular_taxa_mensal(divida)

    pagamentos = [
        pagamento for pagamento in dashboard_data.get("pagamentosDividas", [])
        if int(pagamento.get("dividaId", 0)) == int(divida.get("id", 0))
    ]

    pagamentos_por_mes = {pagamento.get("mes"): pagamento for pagamento in pagamentos}
    meses = meses_ate(mes_inicio, mes or mes_inicio)

    for mes_atual in meses:
        pagamento = pagamentos_por_mes.get(mes_atual)

        if pagamento:
            valor_pago = float(pagamento.get("valorPago", 0) or 0)
            juros_pago = saldo * taxa_mensal
            amortizacao = max(0, valor_pago - juros_pago)
            saldo_depois = max(0, saldo - amortizacao)

            pagamento["saldoAntes"] = round(saldo, 2)
            pagamento["jurosPago"] = round(juros_pago, 2)
            pagamento["amortizacao"] = round(amortizacao, 2)
            pagamento["saldoDepois"] = round(saldo_depois, 2)

            saldo = saldo_depois

        if saldo <= 0:
            if mes_atual < (mes or mes_atual):
                return None
            break

    if saldo <= 0:
        return None

    return {
        **divida,
        "saldo": round(saldo, 2),
        "juros": f'{float(divida.get("taxaJuros", 0) or 0)}%',
        "status": "ativa",
    }


def listar_dividas_do_mes(mes):
    dividas_calculadas = []

    for divida in dashboard_data.get("dividas", []):
        if divida.get("status", "ativa") == "paga":
            continue

        divida_mes = calcular_saldo_divida_no_mes(divida, mes)
        if divida_mes:
            dividas_calculadas.append(divida_mes)

    return dividas_calculadas


def encontrar_item_por_id(lista, item_id):
    for item in lista:
        if int(item.get("id", 0)) == int(item_id):
            return item
    return None


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        send_json(self, {"status": "ok"})

    def do_GET(self):
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
            send_json(self, {"status": "ok", "data": listar_dividas_do_mes(mes)})
            return

        routes = {
            "/api/rendimentos": dashboard_data.get("rendimentos", []),
            "/api/despesas": dashboard_data.get("despesas", []),
            "/api/objetivos": dashboard_data.get("objetivos", []),
            "/api/pagamentos": dashboard_data.get("pagamentos", []),
            "/api/pagamentos-dividas": dashboard_data.get("pagamentosDividas", []),
        }

        if path in routes:
            send_json(self, {"status": "ok", "data": filtrar_por_mes(routes[path], mes)})
        else:
            send_json(self, {"status": "error", "message": "Rota não encontrada"}, 404)

    def do_POST(self):
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
            send_json(self, {"status": "ok", "message": "Rendimento adicionado com sucesso", "data": dados}, 201)

        elif path == "/api/despesas":
            dados["id"] = proximo_id(dashboard_data["despesas"])
            dashboard_data["despesas"].append(dados)
            send_json(self, {"status": "ok", "message": "Despesa adicionada com sucesso", "data": dados}, 201)

        elif path == "/api/dividas":
            dados["id"] = proximo_id(dashboard_data["dividas"])
            dados["mesInicio"] = dados.get("mesInicio", dados.get("mes", MES_PADRAO))
            dados["saldoInicial"] = float(dados.get("saldoInicial", dados.get("saldo", 0)) or 0)
            dados["saldo"] = float(dados.get("saldo", dados.get("saldoInicial", 0)) or 0)
            dados["prestacaoMensal"] = float(dados.get("prestacaoMensal", 0) or 0)
            dados["tipoJuros"] = dados.get("tipoJuros", "mensal")
            dados["taxaJuros"] = float(dados.get("taxaJuros", 0) or 0)
            dados["progresso"] = float(dados.get("progresso", 0) or 0)
            dados["prioridade"] = dados.get("prioridade", "Baixa")
            dados["status"] = dados.get("status", "ativa")
            dashboard_data["dividas"].append(dados)
            send_json(self, {"status": "ok", "message": "Dívida adicionada com sucesso", "data": dados}, 201)

        elif path == "/api/pagamentos-dividas":
            divida_id = int(dados.get("dividaId", 0))
            mes = dados.get("mes", MES_PADRAO)
            valor_pago = float(dados.get("valorPago", 0) or 0)
            divida = encontrar_item_por_id(dashboard_data["dividas"], divida_id)

            if not divida:
                send_json(self, {"status": "error", "message": "Dívida não encontrada"}, 404)
                return

            divida_calculada = calcular_saldo_divida_no_mes(divida, mes)
            saldo_antes = float(divida_calculada.get("saldo", 0) if divida_calculada else 0)
            taxa_mensal = calcular_taxa_mensal(divida)
            juros_pago = saldo_antes * taxa_mensal
            amortizacao = max(0, valor_pago - juros_pago)
            saldo_depois = max(0, saldo_antes - amortizacao)

            pagamento = {
                "id": proximo_id(dashboard_data["pagamentosDividas"]),
                "dividaId": divida_id,
                "mes": mes,
                "valorPago": round(valor_pago, 2),
                "jurosPago": round(juros_pago, 2),
                "amortizacao": round(amortizacao, 2),
                "saldoAntes": round(saldo_antes, 2),
                "saldoDepois": round(saldo_depois, 2),
            }

            dashboard_data["pagamentosDividas"].append(pagamento)

            if saldo_depois <= 0:
                divida["status"] = "paga"

            send_json(self, {"status": "ok", "message": "Pagamento de dívida registado com sucesso", "data": pagamento}, 201)

        else:
            send_json(self, {"status": "error", "message": "Rota POST não encontrada"}, 404)

    def do_PUT(self):
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
                send_json(self, {"status": "error", "message": "Rendimento não encontrado"}, 404)
                return
            item["mes"] = dados.get("mes", item.get("mes", MES_PADRAO))
            item["fonte"] = dados.get("fonte", item["fonte"])
            item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
            item["recebido"] = dados.get("recebido", item["recebido"])
            send_json(self, {"status": "ok", "message": "Rendimento atualizado com sucesso", "data": item})

        elif path == "/api/despesas":
            item = encontrar_item_por_id(dashboard_data["despesas"], item_id)
            if not item:
                send_json(self, {"status": "error", "message": "Despesa não encontrada"}, 404)
                return
            item["mes"] = dados.get("mes", item.get("mes", MES_PADRAO))
            item["categoria"] = dados.get("categoria", item["categoria"])
            item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
            item["realizado"] = dados.get("realizado", item["realizado"])
            item["percentagem"] = dados.get("percentagem", item.get("percentagem", "0%"))
            send_json(self, {"status": "ok", "message": "Despesa atualizada com sucesso", "data": item})

        elif path == "/api/dividas":
            item = encontrar_item_por_id(dashboard_data["dividas"], item_id)
            if not item:
                send_json(self, {"status": "error", "message": "Dívida não encontrada"}, 404)
                return
            item["mesInicio"] = dados.get("mesInicio", item.get("mesInicio", item.get("mes", MES_PADRAO)))
            item["credor"] = dados.get("credor", item["credor"])
            item["saldoInicial"] = float(dados.get("saldoInicial", item.get("saldoInicial", item.get("saldo", 0))) or 0)
            item["saldo"] = float(dados.get("saldo", item.get("saldo", item["saldoInicial"])) or 0)
            item["prestacaoMensal"] = float(dados.get("prestacaoMensal", item.get("prestacaoMensal", 0)) or 0)
            item["tipoJuros"] = dados.get("tipoJuros", item.get("tipoJuros", "mensal"))
            item["taxaJuros"] = float(dados.get("taxaJuros", item.get("taxaJuros", 0)) or 0)
            item["progresso"] = float(dados.get("progresso", item.get("progresso", 0)) or 0)
            item["prioridade"] = dados.get("prioridade", item.get("prioridade", "Baixa"))
            item["status"] = dados.get("status", item.get("status", "ativa"))
            send_json(self, {"status": "ok", "message": "Dívida atualizada com sucesso", "data": item})

        else:
            send_json(self, {"status": "error", "message": "Rota PUT não encontrada"}, 404)

    def do_DELETE(self):
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
            send_json(self, {"status": "error", "message": "Rota DELETE não encontrada"}, 404)
            return

        lista, nome = listas[path]
        item = encontrar_item_por_id(lista, item_id)

        if not item:
            send_json(self, {"status": "error", "message": f"{nome} não encontrado"}, 404)
            return

        lista.remove(item)
        send_json(self, {"status": "ok", "message": f"{nome} apagado com sucesso", "data": item})
