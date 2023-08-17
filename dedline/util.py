from flask import jsonify, Response


def create_result(data: dict | list = None, error: bool = False, message: str = None) -> Response:
    return jsonify({
        "error": error,
        "message": message,
        "result": data
    })
