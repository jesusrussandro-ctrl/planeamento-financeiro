from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import send_json


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        send_json(self, {"status": "ok"})

    def do_GET(self):
        path = self.path.split("?")[0]

        routes = {
            "/api/dashboard": dashboard_data,
            "/api/rendimentos": dashboard_data["rendimentos"],
            "/api/despesas": dashboard_data["despesas"],
            "/api/dividas": dashboard_data["dividas"],
            "/api/objetivos": dashboard_data["objetivos"],
            "/api/pagamentos": dashboard_data["pagamentos"],
        }

        if path in routes:
            send_json(self, {
                "status": "ok",
                "data": routes[path]
            })
        else:
            send_json(self, {
                "status": "error",
                "message": "Rota não encontrada"
            }, 404)

    def do_POST(self):
        path = self.path.split("?")[0]

        if path == "/api/rendimentos":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)

            try:
                novo_rendimento = json.loads(body.decode("utf-8"))

                novo_rendimento["id"] = len(dashboard_data["rendimentos"]) + 1

                dashboard_data["rendimentos"].append(novo_rendimento)

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento adicionado com sucesso",
                    "data": novo_rendimento
                }, 201)

            except Exception as error:
                send_json(self, {
                    "status": "error",
                    "message": "Erro ao adicionar rendimento",
                    "detail": str(error)
                }, 400)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota POST não encontrada"
            }, 404)