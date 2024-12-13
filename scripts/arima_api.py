from flask import Flask, request, jsonify
import pickle

with open('arima_model.pkl', 'rb') as model_file:
    arima_model = pickle.load(model_file)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
       
        data = request.get_json()
        steps = int(data.get('steps', 12))  
    
        forecast = arima_model.get_forecast(steps=steps)
        forecast_mean = forecast.predicted_mean.tolist()
        forecast_ci = forecast.conf_int().values.tolist()

     
        return jsonify({
            'forecast': forecast_mean,
            'confidence_intervals': forecast_ci
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)  