from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import send_json


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        send_json(self, {"status": "ok"})

    def do_GET(self):
        path = urlparse(self.path).path

        routes = {
            "/api/dashboard": dashboard_data,
            "/api/rendimentos": dashboard_data.get("rendimentos", []),
            "/api/despesas": dashboard_data.get("despesas", []),
            "/api/dividas": dashboard_data.get("dividas", []),
            "/api/objetivos": dashboard_data.get("objetivos", []),
            "/api/pagamentos": dashboard_data.get("pagamentos", []),
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
        path = urlparse(self.path).path
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            dados = json.loads(body.decode("utf-8")) if body else {}
        except Exception:
            dados = {}

        if path == "/api/rendimentos":
            dados["id"] = len(dashboard_data["rendimentos"]) + 1
            dashboard_data["rendimentos"].append(dados)

            send_json(self, {
                "status": "ok",
                "message": "Rendimento adicionado com sucesso",
                "data": dados
            }, 201)

        elif path == "/api/despesas":
            dados["id"] = len(dashboard_data["despesas"]) + 1
            dashboard_data["despesas"].append(dados)

            send_json(self, {
                "status": "ok",
                "message": "Despesa adicionada com sucesso",
                "data": dados
            }, 201)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota POST não encontrada"
            }, 404)

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
            for item in dashboard_data["rendimentos"]:
                if item["id"] == item_id:
                    item["fonte"] = dados.get("fonte", item["fonte"])
                    item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
                    item["recebido"] = dados.get("recebido", item["recebido"])

                    send_json(self, {
                        "status": "ok",
                        "message": "Rendimento atualizado com sucesso",
                        "data": item
                    })
                    return

            send_json(self, {
                "status": "error",
                "message": "Rendimento não encontrado"
            }, 404)

        elif path == "/api/despesas":
            for item in dashboard_data["despesas"]:
                if item["id"] == item_id:
                    item["categoria"] = dados.get("categoria", item["categoria"])
                    item["orcamentado"] = dados.get("orcamentado", item["orcamentado"])
                    item["realizado"] = dados.get("realizado", item["realizado"])
                    item["percentagem"] = dados.get("percentagem", item.get("percentagem", "0%"))

                    send_json(self, {
                        "status": "ok",
                        "message": "Despesa atualizada com sucesso",
                        "data": item
                    })
                    return

            send_json(self, {
                "status": "error",
                "message": "Despesa não encontrada"
            }, 404)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota PUT não encontrada"
            }, 404)

    def do_DELETE(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)
        item_id = int(query.get("id", [0])[0])

        if path == "/api/rendimentos":
            for item in dashboard_data["rendimentos"]:
                if item["id"] == item_id:
                    dashboard_data["rendimentos"].remove(item)

                    send_json(self, {
                        "status": "ok",
                        "message": "Rendimento apagado com sucesso",
                        "data": item
                    })
                    return

            send_json(self, {
                "status": "error",
                "message": "Rendimento não encontrado"
            }, 404)

        elif path == "/api/despesas":
            for item in dashboard_data["despesas"]:
                if item["id"] == item_id:
                    dashboard_data["despesas"].remove(item)

                    send_json(self, {
                        "status": "ok",
                        "message": "Despesa apagada com sucesso",
                        "data": item
                    })
                    return

            send_json(self, {
                "status": "error",
                "message": "Despesa não encontrada"
            }, 404)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota DELETE não encontrada"
            }, 404)