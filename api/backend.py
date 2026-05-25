from http.server import BaseHTTPRequestHandler
import json
from datetime import date

# --- CONFIGURATION AND DATA ---
MOEDAS = {
    "EUR": {"codigo": "EUR", "nome": "Euro", "simbolo": "€"},
    "USD": {"codigo": "USD", "nome": "Dólar", "simbolo": "$"},
    "BRL": {"codigo": "BRL", "nome": "Real", "simbolo": "R$"},
    "GBP": {"codigo": "GBP", "nome": "Libra", "simbolo": "£"},
    "AOA": {"codigo": "AOA", "nome": "Kwanza", "simbolo": "Kz"},
    "AED": {"codigo": "AED", "nome": "Dirham", "simbolo": "د.إ"},
}

DATA = {
    "moeda": MOEDAS["EUR"],
    "salarioLiquido": 5000,
    "reservaPercentagem": 10,
    "despesas": [
        {"categoria": "Habitação", "orcamentado": 950, "realizado": 950},
        {"categoria": "Transportes", "orcamentado": 400, "realizado": 400},
        {"categoria": "Alimentação", "orcamentado": 600, "realizado": 600},
        {"categoria": "Saúde", "orcamentado": 200, "realizado": 200},
        {"categoria": "Lazer", "orcamentado": 200, "realizado": 200},
        {"categoria": "Educação", "orcamentado": 150, "realizado": 150},
        {"categoria": "Assinaturas", "orcamentado": 100, "realizado": 80},
        {"categoria": "Cuidados Pessoais", "orcamentado": 100, "realizado": 90},
        {"categoria": "Contas Fixas", "orcamentado": 300, "realizado": 300},
        {"categoria": "Outros", "orcamentado": 350, "realizado": 330},
        {"categoria": "Reserva", "orcamentado": 500, "realizado": 500},
    ],
    "dividas": [
        {"credor": "Cartão de Crédito", "saldo": 5000, "juros": 8, "minimo": 200, "prioridade": "Alta", "progresso": 80},
        {"credor": "Empréstimo Pessoal", "saldo": 10000, "juros": 3.5, "minimo": 350, "prioridade": "Alta", "progresso": 65},
        {"credor": "Financiamento Automóvel", "saldo": 8000, "juros": 1.5, "minimo": 400, "prioridade": "Média", "progresso": 40},
        {"credor": "Cheque Especial", "saldo": 2000, "juros": 9, "minimo": 150, "prioridade": "Alta", "progresso": 25},
        {"credor": "Crédito Loja", "saldo": 1450, "juros": 2.9, "minimo": 100, "prioridade": "Baixa", "progresso": 15},
    ],
    "objetivos": [
        {"nome": "Fundo de Emergência", "atual": 2100, "objetivo": 3000},
        {"nome": "Quitar Cartão de Crédito", "atual": 1000, "objetivo": 5000},
        {"nome": "Entrada para Casa", "atual": 3750, "objetivo": 15000},
        {"nome": "Nova Viatura", "atual": 6000, "objetivo": 20000},
    ],
    "pagamentos": [
        {"nome": "Habitação", "data": "01/06", "valor": 700, "dias": 2},
        {"nome": "Cartão de Crédito", "data": "05/06", "valor": 500, "dias": 5},
        {"nome": "Luz", "data": "07/06", "valor": 85, "dias": 7},
        {"nome": "Empréstimo Pessoal", "data": "10/06", "valor": 450, "dias": 10},
        {"nome": "Internet", "data": "12/06", "valor": 35, "dias": 12},
    ],
}

def prioridade_peso(valor):
    pesos = {"Alta": 3, "Média": 2, "Baixa": 1}
    return pesos.get(valor, 1)

def calcular_resumo(data):
    salario = float(data.get("salarioLiquido", 0))
    despesas = data.get("despesas", [])
    dividas = data.get("dividas", [])

    total_despesas = sum(float(x.get("realizado", 0)) for x in despesas)
    total_dividas = sum(float(x.get("saldo", 0)) for x in dividas)
    total_minimo = sum(float(x.get("minimo", 0)) for x in dividas)
    reserva = salario * (float(data.get("reservaPercentagem", 0)) / 100)
    disponivel = max(salario - total_despesas, 0)

    meses = 0
    if disponivel > 0:
        meses = int((total_dividas + disponivel - 1) // disponivel)

    comprometido = 0
    if salario > 0:
        comprometido = ((total_despesas + total_minimo) / salario * 100)

    indice = round(100 - max(0, comprometido - 50) * 0.8)
    indice = max(0, min(100, indice))

    extra = max(disponivel - total_minimo, 0)
    total_peso = sum(prioridade_peso(x.get("prioridade")) for x in dividas) or 1

    pagamento_ideal = []
    for d in dividas:
        peso = prioridade_peso(d.get("prioridade"))
        valor = float(d.get("minimo", 0)) + extra * peso / total_peso

        tempo = 0
        saldo = float(d.get("saldo", 0))
        if valor > 0:
            tempo = int((saldo + valor - 1) // valor)

        pagamento_ideal.append({
            "credor": d.get("credor"),
            "pagamentoIdeal": round(valor, 2),
            "percentagemDisponivel": round((valor / disponivel * 100), 1) if disponivel else 0,
            "tempoEstimado": tempo,
        })

    evolucao = [
        {"mes": i, "divida": max(round(total_dividas - disponivel * i, 2), 0)}
        for i in range(max(meses + 1, 24))
    ]

    alertas = []
    if comprometido > 75:
        alertas.append({"tipo": "Alerta", "texto": "O salário comprometido está elevado."})
    if any(float(d.get("juros", 0)) >= 8 for d in dividas):
        alertas.append({"tipo": "Atenção", "texto": "Existem dívidas com juros altos."})
    if reserva >= salario * 0.1:
        alertas.append({"tipo": "Ótimo", "texto": "A reserva mensal está saudável."})

    return {
        "totalDespesas": round(total_despesas, 2),
        "totalDividas": round(total_dividas, 2),
        "totalMinimoDividas": round(total_minimo, 2),
        "reserva": round(reserva, 2),
        "disponivelDividas": round(disponivel, 2),
        "salarioComprometido": round(comprometido, 1),
        "mesesSemDivida": meses,
        "indice": indice,
        "pagamentoIdeal": pagamento_ideal,
        "evolucaoDivida": evolucao,
        "alertas": alertas,
    }

class handler(BaseHTTPRequestHandler):
    def _send(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send({"ok": True})

    def do_GET(self):
        if self.path == "/api/backend":
            resposta = DATA.copy()
            resposta["resumo"] = calcular_resumo(DATA)
            self._send(resposta)
        else:
            self._send({"error": "Not Found"}, status=404)

    def do_POST(self):
        global DATA
        if self.path == "/api/backend":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8") if length else "{}"
            try:
                recebido = json.loads(body or "{}")
            except json.JSONDecodeError:
                self._send({"error": "Invalid JSON"}, status=400)
                return

            if "moedaCodigo" in recebido:
                recebido["moeda"] = MOEDAS.get(recebido["moedaCodigo"], MOEDAS["EUR"])
                recebido.pop("moedaCodigo", None)

            DATA = {**DATA, **recebido}
            resposta = DATA.copy()
            resposta["resumo"] = calcular_resumo(DATA)
            self._send(resposta)
        else:
            self._send({"error": "Not Found"}, status=404)

if __name__ == "__main__":
    from http.server import HTTPServer
    server = HTTPServer(('localhost', 3000), handler)
    print("Backend running on http://localhost:3000")
    server.serve_forever()
