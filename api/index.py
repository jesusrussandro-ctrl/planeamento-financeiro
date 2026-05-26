from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import parse_qs, urlparse

sys.path.append(os.path.dirname(__file__))

from data import dashboard_data
from utils import is_authorized, send_error, send_json


MAX_BODY_SIZE = 10_000


def next_id(items):
    return max((int(item.get("id", 0)) for item in items), default=0) + 1


def validate_rendimento(payload):
    if not isinstance(payload, dict):
        raise ValueError("Pedido invalido")

    fonte = str(payload.get("fonte", "")).strip()
    if not fonte:
        raise ValueError("Fonte e obrigatoria")
    if len(fonte) > 100:
        raise ValueError("Fonte nao pode exceder 100 caracteres")

    try:
        orcamentado = float(payload.get("orcamentado", 0))
        recebido = float(payload.get("recebido", 0))
    except (TypeError, ValueError):
        raise ValueError("Valores devem ser numericos")

    if orcamentado < 0 or recebido < 0:
        raise ValueError("Valores nao podem ser negativos")

    return {
        "fonte": fonte,
        "orcamentado": round(orcamentado, 2),
        "recebido": round(recebido, 2),
    }


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        send_json(self, {"status": "ok"})

    def do_GET(self):
        if not is_authorized(self):
            send_error(self, "Nao autorizado", 401)
            return

        path = urlparse(self.path).path

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
            send_error(self, "Rota nao encontrada", 404)

    def do_POST(self):
        if not is_authorized(self):
            send_error(self, "Nao autorizado", 401)
            return

        path = urlparse(self.path).path

        if path == "/api/rendimentos":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
            except ValueError:
                send_error(self, "Content-Length invalido", 400)
                return

            if content_length > MAX_BODY_SIZE:
                send_error(self, "Pedido demasiado grande", 413)
                return

            body = self.rfile.read(content_length)

            try:
                payload = json.loads(body.decode("utf-8"))
                novo_rendimento = validate_rendimento(payload)
                novo_rendimento["id"] = next_id(dashboard_data["rendimentos"])

                dashboard_data["rendimentos"].append(novo_rendimento)

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento adicionado com sucesso",
                    "data": novo_rendimento
                }, 201)

            except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as error:
                send_error(self, str(error), 400)

        else:
            send_error(self, "Rota POST nao encontrada", 404)

    def do_DELETE(self):
        if not is_authorized(self):
            send_error(self, "Nao autorizado", 401)
            return

        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == "/api/rendimentos":
            try:
                params = parse_qs(parsed_url.query)
                rendimento_id = int(params.get("id", ["0"])[0])

                rendimento_encontrado = None

                for item in dashboard_data["rendimentos"]:
                    if item["id"] == rendimento_id:
                        rendimento_encontrado = item
                        break

                if not rendimento_encontrado:
                    send_error(self, "Rendimento nao encontrado", 404)
                    return

                dashboard_data["rendimentos"].remove(rendimento_encontrado)

                send_json(self, {
                    "status": "ok",
                    "message": "Rendimento apagado com sucesso",
                    "data": rendimento_encontrado
                })

            except (TypeError, ValueError):
                send_error(self, "ID invalido", 400)

        else:
            send_error(self, "Rota DELETE nao encontrada", 404)
