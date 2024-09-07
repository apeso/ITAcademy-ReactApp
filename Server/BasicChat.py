from flask import Flask, request, jsonify
from flask_cors import CORS
from training import BasicAssistant  
import json
import os

assistant = BasicAssistant('intents.json')
assistant.fit_model(epochs=50)
assistant.save_model()

#workshops=BasicAssistant('workshops.json')

app = Flask(__name__)
CORS(app)  

@app.route('/')
def index():
    return 'Hello, this is your Flask server.'


@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    message = data['message']
    
    # Process the input message using the assistant
    response = assistant.process_input(message)
    
    # Prepare the response to send back to the client
    result = {'message': response}
    
    return jsonify(result)


@app.route('/process_workshopsData', methods=['POST'])
def process_workshopsData():
    data = request.get_json()

    # Specify the file path
    file_path = 'workshops.json'
    
    # Save the received data to a JSON file
    try:
        with open(file_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        result = {'message': "Data saved successfully"}
    except Exception as e:
        result = {'message': f"An error occurred: {e}"}

    return jsonify(result)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
