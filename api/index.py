from http.server import BaseHTTPRequestHandler
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import send_json


def get_query_params(path):
    query = path.split("?")[1] if "?" in path else ""
    return dict(
        param.split("=")
        for param in query.split("&")
        if "=" in param
    )


def find_item_by_id(lista, item_id):
    for item in lista:
        if item["id"] == item_id:
            return item
    return None


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
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        if path == "/api/rendimentos":
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

        elif path == "/api/despesas":
            try:
                nova_despesa = json.loads(body.decode("utf-8"))
                nova_despesa["id"] = len(dashboard_data["despesas"]) + 1

                dashboard_data["despesas"].append(nova_despesa)

                send_json(self, {
                    "status": "ok",
                    "message": "Despesa adicionada com sucesso",
                    "data": nova_despesa
                }, 201)

            except Exception as error:
                send_json(self, {
                    "status": "error",
                    "message": "Erro ao adicionar despesa",
                    "detail": str(error)
                }, 400)

        else:
            send_json(self, {
                "status": "error",
                "message": "Rota POST não encontrada"
            }, 404)

    def do_PUT(self):
        path = self.path.split("?")[0]

        try:
            params = get_query_params(self.path)
            item_id = int(params.get("id", 0))

            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            dados_atualizados = json.loads(body.decode("utf-8"))

            if path == "/api/rendimentos":
                rendimento = find_item_by_id(dashboard_data["rendimentos"], item_id)

                if not rendimento:
                    send_json(self, {
                        "status": "error",
                        "message": "Rendimento não encontrado"
                    }, 404)
                    return

                rendimento["fonte"] = dados_atualizados.get("fonte", rendimento["fonte"])
                rendimento["orcamentado"] = dados_atualizados.get("orcamentado", rendimento["orcamentado"])
                rendimento["recebido"] = dados_atualizados.get("recebido", rendimento["recebido"])

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento atualizado com sucesso",
                    "data": rendimento
                })

            elif path == "/api/despesas":
                despesa = find_item_by_id(dashboard_data["despesas"], item_id)

                if not despesa:
                    send_json(self, {
                        "status": "error",
                        "message": "Despesa não encontrada"
                    }, 404)
                    return

                despesa["categoria"] = dados_atualizados.get("categoria", despesa["categoria"])
                despesa["orcamentado"] = dados_atualizados.get("orcamentado", despesa["orcamentado"])
                despesa["realizado"] = dados_atualizados.get("realizado", despesa["realizado"])
                despesa["percentagem"] = dados_atualizados.get("percentagem", despesa["percentagem"])

                send_json(self, {
                    "status": "ok",
                    "message": "Despesa atualizada com sucesso",
                    "data": despesa
                })

            else:
                send_json(self, {
                    "status": "error",
                    "message": "Rota PUT não encontrada"
                }, 404)

        except Exception as error:
            send_json(self, {
                "status": "error",
                "message": "Erro ao atualizar item",
                "detail": str(error)
            }, 400)

    def do_DELETE(self):
        path = self.path.split("?")[0]

        try:
            params = get_query_params(self.path)
            item_id = int(params.get("id", 0))

            if path == "/api/rendimentos":
                rendimento = find_item_by_id(dashboard_data["rendimentos"], item_id)

                if not rendimento:
                    send_json(self, {
                        "status": "error",
                        "message": "Rendimento não encontrado"
                    }, 404)
                    return

                dashboard_data["rendimentos"].remove(rendimento)

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento apagado com sucesso",
                    "data": rendimento
                })

            elif path == "/api/despesas":
                despesa = find_item_by_id(dashboard_data["despesas"], item_id)

                if not despesa:
                    send_json(self, {
                        "status": "error",
                        "message": "Despesa não encontrada"
                    }, 404)
                    return

                dashboard_data["despesas"].remove(despesa)

                send_json(self, {
                    "status": "ok",
                    "message": "Despesa apagada com sucesso",
                    "data": despesa
                })

            else:
                send_json(self, {
                    "status": "error",
                    "message": "Rota DELETE não encontrada"
                }, 404)

        except Exception as error:
            send_json(self, {
                "status": "error",
                "message": "Erro ao apagar item",
                "detail": str(error)
            }, 400)