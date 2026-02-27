from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "AI service running",
        "service": "SaarthiNet AI"
    })

@app.route("/process", methods=["POST"])
def process():
    data = request.json
    text = data.get("text")

    response = f"Saarthi AI received: {text}"

    return jsonify({
        "intent": "information_request",
        "response": response
    })

if __name__ == "__main__":
    app.run(port=5000)