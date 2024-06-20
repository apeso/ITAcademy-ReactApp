from flask import Flask, request, jsonify
from flask_cors import CORS
from training import BasicAssistant  


assistant = BasicAssistant('intents.json')
assistant.fit_model(epochs=50)
assistant.save_model()

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

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
