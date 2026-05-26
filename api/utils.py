import json
import os


ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "")
ALLOWED_METHODS = "GET, POST, DELETE, OPTIONS"


def is_authorized(handler):
    api_token = os.environ.get("API_TOKEN")

    if not api_token:
        return True

    return handler.headers.get("Authorization") == f"Bearer {api_token}"


def send_json(handler, data, status=200):
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")

    origin = handler.headers.get("Origin")
    if ALLOWED_ORIGIN and origin == ALLOWED_ORIGIN:
        handler.send_header("Access-Control-Allow-Origin", origin)
        handler.send_header("Vary", "Origin")
    elif not ALLOWED_ORIGIN:
        handler.send_header("Access-Control-Allow-Origin", "*")

    handler.send_header("Access-Control-Allow-Methods", ALLOWED_METHODS)
    handler.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    handler.end_headers()
    handler.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))


def send_error(handler, message, status=400):
    send_json(handler, {
        "status": "error",
        "message": message,
    }, status)
