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
        "rendimentos": [],
        "despesas": [],
        "dividas": [],
        "objetivos": [],
        "pagamentos": []
    }
}


class handler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self._send_json({"ok": True})

    def do_GET(self):
        if self.path == "/api/dashboard":
            self._send_json(dashboard)
        else:
            self._send_json({"error": "Rota não encontrada"}, 404)

    def do_POST(self):
        self._send_json({
            "status": "ok",
            "message": "POST recebido com sucesso"
        })