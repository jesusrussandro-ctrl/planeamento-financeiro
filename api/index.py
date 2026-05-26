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

    def do_PUT(self):
        path = self.path.split("?")[0]
        query = self.path.split("?")[1] if "?" in self.path else ""

        if path == "/api/rendimentos":
            try:
                params = dict(
                    param.split("=")
                    for param in query.split("&")
                    if "=" in param
                )

                rendimento_id = int(params.get("id", 0))

                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                dados_atualizados = json.loads(body.decode("utf-8"))

                rendimento_encontrado = None

                for item in dashboard_data["rendimentos"]:
                    if item["id"] == rendimento_id:
                        rendimento_encontrado = item
                        break

                if not rendimento_encontrado:
                    send_json(self, {
                        "status": "error",
                        "message": "Rendimento não encontrado"
                    }, 404)
                    return

                rendimento_encontrado["fonte"] = dados_atualizados.get("fonte", rendimento_encontrado["fonte"])
                rendimento_encontrado["orcamentado"] = dados_atualizados.get("orcamentado", rendimento_encontrado["orcamentado"])
                rendimento_encontrado["recebido"] = dados_atualizados.get("recebido", rendimento_encontrado["recebido"])

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento atualizado com sucesso",
                    "data": rendimento_encontrado
                })

            except Exception as error:
                send_json(self, {
                    "status": "error",
                    "message": "Erro ao atualizar rendimento",
                    "detail": str(error)
                }, 400)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota PUT não encontrada"
            }, 404)

    def do_DELETE(self):
        path = self.path.split("?")[0]
        query = self.path.split("?")[1] if "?" in self.path else ""

        if path == "/api/rendimentos":
            try:
                params = dict(
                    param.split("=")
                    for param in query.split("&")
                    if "=" in param
                )

                rendimento_id = int(params.get("id", 0))

                rendimento_encontrado = None

                for item in dashboard_data["rendimentos"]:
                    if item["id"] == rendimento_id:
                        rendimento_encontrado = item
                        break

                if not rendimento_encontrado:
                    send_json(self, {
                        "status": "error",
                        "message": "Rendimento não encontrado"
                    }, 404)
                    return

                dashboard_data["rendimentos"].remove(rendimento_encontrado)

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento apagado com sucesso",
                    "data": rendimento_encontrado
                })

            except Exception as error:
                send_json(self, {
                    "status": "error",
                    "message": "Erro ao apagar rendimento",
                    "detail": str(error)
                }, 400)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota DELETE não encontrada"
            }, 404)
                def do_PUT(self):
        path = self.path.split("?")[0]
        query = self.path.split("?")[1] if "?" in self.path else ""

        if path == "/api/rendimentos":
            try:
                params = dict(
                    param.split("=")
                    for param in query.split("&")
                    if "=" in param
                )

                rendimento_id = int(params.get("id", 0))

                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                dados_atualizados = json.loads(body.decode("utf-8"))

                rendimento_encontrado = None

                for item in dashboard_data["rendimentos"]:
                    if item["id"] == rendimento_id:
                        rendimento_encontrado = item
                        break

                if not rendimento_encontrado:
                    send_json(self, {
                        "status": "error",
                        "message": "Rendimento não encontrado"
                    }, 404)
                    return

                rendimento_encontrado["fonte"] = dados_atualizados.get("fonte", rendimento_encontrado["fonte"])
                rendimento_encontrado["orcamentado"] = dados_atualizados.get("orcamentado", rendimento_encontrado["orcamentado"])
                rendimento_encontrado["recebido"] = dados_atualizados.get("recebido", rendimento_encontrado["recebido"])

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento atualizado com sucesso",
                    "data": rendimento_encontrado
                })

            except Exception as error:
                send_json(self, {
                    "status": "error",
                    "message": "Erro ao atualizar rendimento",
                    "detail": str(error)
                }, 400)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota PUT não encontrada"
            }, 404)