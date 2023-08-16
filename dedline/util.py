from flask import jsonify, Response


def create_result(data: dict, error: False, message: str = "") -> Response:
    return jsonify({
        "error": error,
        "message": message,
        "result": data
    })
