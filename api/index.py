from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/api/backend":

            data = {
                "status": "ok",
                "mensagem": "API do planeamento financeiro online"
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(json.dumps(data).encode())

        else:

            html = """
            <!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <title>Planeamento Financeiro</title>
            </head>
            <body style="font-family:Arial;padding:40px">
                <h1>Website online 🚀</h1>
                <p>Planeamento financeiro ativo.</p>
            </body>
            </html>
            """

            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()

            self.wfile.write(html.encode())
