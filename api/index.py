from http.server import BaseHTTPRequestHandler
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
        send_json(self, {
            "status": "ok",
            "message": "POST recebido com sucesso"
        })