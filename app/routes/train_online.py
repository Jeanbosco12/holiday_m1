from fastapi import APIRouter
from app.services.train_service import train_model_from_csv
import pandas as pd
import requests
import os

router = APIRouter()

API_KEY = "N9WMMHHUMGEXRASG3RWXTMYE2"
MODEL_PATH = "model/rna_model.pkl"
CSV_PATH = "data/train.csv"


def fetch_visualcrossing_data():
    url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madagascar"
    params = {
        "unitGroup": "metric",
        "key": API_KEY,
        "contentType": "json"
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("days", [])


def generate_training_csv(path: str):
    days = fetch_visualcrossing_data()
    rows = []

    for day in days:
        row = {
            "temperature": day.get("temp", 0),
            "humidity": day.get("humidity", 0),
            "pressure": day.get("pressure", 1013),
            "wind_speed": day.get("windspeed", 0),
            "satellite_value": day.get("cloudcover", 0),
            "target": 0  # ⚠️ cible temporaire (0 = pas de catastrophe) à ajuster plus tard
        }
        rows.append(row)

    df = pd.DataFrame(rows)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_csv(path, index=False)


@router.post("/train_online")
def train_online():
    try:
        generate_training_csv(CSV_PATH)
        train_model_from_csv(CSV_PATH)
        return {"status": "success", "message": "Modèle entraîné avec les données météo Visual Crossing."}
    except Exception as e:
        return {"status": "error", "message": str(e)}
