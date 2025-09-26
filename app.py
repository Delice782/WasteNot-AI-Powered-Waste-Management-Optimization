                                                                                 
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load pre-trained model for waste collection prediction
with open('model/waste_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "WasteNot API is running."

@app.route('/predict_route', methods=['POST'])
def predict_route():
    data = request.get_json()
    bin_fill_level = data['bin_fill_level']
    traffic_conditions = data['traffic_conditions']
    # Predict optimal route based on data
    features = np.array([[bin_fill_level, traffic_conditions]])
    route = model.predict(features)
    return jsonify({'recommended_route': route[0]})

@app.route('/recycling_tips', methods=['GET'])
def recycling_tips():
    # Placeholder for recycling tips
    tips = [
        "Separate paper, plastic, and organic waste.",
        "Avoid contamination in the recycling bin.",
        "Use reusable containers instead of disposable ones."
    ]
    return jsonify({'tips': tips})

if __name__ == '__main__':
    app.run(debug=True)
