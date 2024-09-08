from flask import Flask, request, jsonify
from flask_cors import CORS
from training import BasicAssistant  
import json
import os

# Inicializacija i treniranje modela
assistant = BasicAssistant('intents.json')
assistant.fit_model(epochs=50)
assistant.save_model()

app = Flask(__name__)
CORS(app)  

# Učitaj podatke o radionicama
with open('workshops.json', 'r') as f:
    workshops = json.load(f)

@app.route('/')
def index():
    return 'Hello, this is your Flask server.'

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    message = data['message']

    # Procesuiranje ulazne poruke koristeći asistenta
    response = assistant.process_input(message)
    
    # Pripremi odgovor za slanje natrag klijentu
    result = {'message': response}
    
    return jsonify(result)

def recommend_workshop(user_input):
    best_match = None
    max_score = 0
    for workshop in workshops:
        score = 0
        pattern = workshop['pattern']
        
        # Ocjenjivanje na temelju korisničkog unosa
        if pattern['tema'].lower() in user_input.lower():
            score += 1
        if pattern['tezina'].lower() in user_input.lower():
            score += 1
        if pattern['preparationType'].lower() in user_input.lower():
            score += 1
        if pattern['learningStyle'].lower() in user_input.lower():
            score += 1
        if pattern['dailyCommitment'].lower() in user_input.lower():
            score += 1

        if score > max_score:
            max_score = score
            best_match = workshop

    return best_match


@app.route('/recommend_workshop', methods=['POST'])
def recommend_workshop_endpoint():
    data = request.get_json()
    user_input = data['userInput']
    
    recommended_workshop = recommend_workshop(user_input)
    
    result = {
        'recommendation': recommended_workshop if recommended_workshop else 'Nema odgovarajuće radionice.'
    }
    
    return jsonify(result)

@app.route('/process_workshopsData', methods=['POST'])
def process_workshopsData():
    data = request.get_json()

    # Specifikacija putanje datoteke
    file_path = 'workshops.json'
    
    # Spremi primljene podatke u JSON datoteku
    try:
        with open(file_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        result = {'message': "Data saved successfully"}
    except Exception as e:
        result = {'message': f"An error occurred: {e}"}

    return jsonify(result)

# Pokreni Flask aplikaciju
if __name__ == '__main__':
    app.run(debug=True)
