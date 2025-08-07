import requests
import joblib
from typing import List
from app.schemas.prediction import GeoPrediction

# Charger une seule fois le modèle
model = joblib.load("model/rna_model.pkl")

def interpret_prediction(prediction: int, prob: float):
    if prediction == 1:
        if prob > 0.9:
            return "tempête", "critique"
        elif prob > 0.7:
            return "inondation", "élevé"
        elif prob > 0.5:
            return "sécheresse", "modéré"
        else:
            return "cyclone", "modéré"
    return "aucun", "faible"

def fetch_weather_forecast():
    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madagascar"
    params = {
        "unitGroup": "metric",
        "key": "N9WMMHHUMGEXRASG3RWXTMYE2",
        "contentType": "json"
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    return data.get("days", []), data.get("latitude"), data.get("longitude")

def get_geo_predictions() -> List[GeoPrediction]:
    forecast_days, lat, lng = fetch_weather_forecast()
    results = []

    for i, day in enumerate(forecast_days):
        features = [
            day.get("temp", 0),
            day.get("humidity", 0),
            day.get("pressure", 1013),
            day.get("windspeed", 0),
            day.get("cloudcover", 0)
        ]

        prediction = model.predict([features])[0]
        prob = model.predict_proba([features])[0][1]

        event_type, risk_level = interpret_prediction(prediction, prob)

        results.append(
            GeoPrediction(
                id=i + 1,
                lat=lat,
                lng=lng,
                datePrediction=day["datetime"],
                temperature=features[0],
                rainfall=day.get("precip", 0),
                event_type=event_type,
                risk_level=risk_level
            )
        )

    return results
