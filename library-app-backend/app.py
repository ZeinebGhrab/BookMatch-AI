from flask import Flask, request, jsonify
from flask_cors import CORS
import agent  # Importer l'agent

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    username, _ = agent.agent.perceive(request.json)
    result = agent.agent.react('recommend', username, [])
    return jsonify(result)

@app.route('/register', methods=['POST'])
def register():
    username, _ = agent.agent.perceive(request.json)
    result = agent.agent.react('register', username, [])
    return jsonify(result)

@app.route('/select_books', methods=['POST'])
def select_books():
    username, book_ids = agent.agent.perceive(request.json)
    result = agent.agent.react('select_books', username, book_ids)
    return jsonify(result)

@app.route('/user_books', methods=['POST'])
def user_books():
    username, _ = agent.agent.perceive(request.json)
    result = agent.agent.react('user_books', username, [])
    return jsonify(result)

@app.route('/available_books', methods=['GET'])
def available_books():
    result = agent.agent.react('available_books', '', [])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)