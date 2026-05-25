from http.server import BaseHTTPRequestHandler
import json


dashboard = {
    "status": "ok",
    "message": "Backend Python ativo",
    "data": {
        "salarioLiquido": 5000,
        "totalDespesas": 2650,
        "disponivelDividas": 1350,
        "totalDividas": 28450,
        "diasRestantes": 17,
        "saudeFinanceira": 85,

        "rendimentos": [
            {"fonte": "Salário Principal", "orcamentado": 5000, "recebido": 5000},
            {"fonte": "Trabalho Extra / Freelance", "orcamentado": 0, "recebido": 0},
            {"fonte": "Investimentos", "orcamentado": 0, "recebido": 0},
            {"fonte": "Outros Rendimentos", "orcamentado": 0, "recebido": 0},
        ],

        "despesas": [
            {"categoria": "Habitação", "orcamentado": 950, "realizado": 950, "percentagem": "19%"},
            {"categoria": "Transportes", "orcamentado": 400, "realizado": 400, "percentagem": "8%"},
            {"categoria": "Alimentação", "orcamentado": 600, "realizado": 600, "percentagem": "12%"},
            {"categoria": "Saúde", "orcamentado": 200, "realizado": 200, "percentagem": "4%"},
            {"categoria": "Lazer", "orcamentado": 200, "realizado": 200, "percentagem": "4%"},
            {"categoria": "Outros", "orcamentado": 300, "realizado": 300, "percentagem": "6%"},
        ],

        "dividas": [
            {"credor": "Cartão de Crédito", "saldo": 5000, "progresso": 80, "juros": "8.0%", "prioridade": "Alta"},
            {"credor": "Empréstimo Pessoal", "saldo": 10000, "progresso": 65, "juros": "3.5%", "prioridade": "Alta"},
            {"credor": "Financiamento Auto", "saldo": 8000, "progresso": 40, "juros": "1.5%", "prioridade": "Média"},
            {"credor": "Crédito Loja", "saldo": 1450, "progresso": 15, "juros": "2.9%", "prioridade": "Baixa"},
        ],

        "objetivos": [
            {"nome": "Fundo de Emergência", "objetivo": 3000, "atual": 2100, "percentagem": 70},
            {"nome": "Quitar Cartão de Crédito", "objetivo": 5000, "atual": 1000, "percentagem": 20},
            {"nome": "Entrada para Casa", "objetivo": 15000, "atual": 3750, "percentagem": 25},
            {"nome": "Nova Viatura", "objetivo": 20000, "atual": 6000, "percentagem": 30},
        ],

        "pagamentos": [
            {"data": "01/06", "nome": "Habitação", "valor": 700, "dias": "2 dias"},
            {"data": "05/06", "nome": "Cartão de Crédito", "valor": 500, "dias": "5 dias"},
            {"data": "07/06", "nome": "Luz", "valor": 85, "dias": "7 dias"},
            {"data": "12/06", "nome": "Internet", "valor": 35, "dias": "12 dias"},
        ],
    }
}


class handler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def do_OPTIONS(self):
        self._send_json({"ok": True})

    def do_GET(self):
        if self.path.startswith("/api/dashboard"):
            self._send_json(dashboard)
        else:
            self._send_json({"error": "Rota não encontrada"}, 404)

    def do_POST(self):
        self._send_json({
            "status": "ok",
            "message": "POST recebido com sucesso"
        })