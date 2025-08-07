from pydantic import BaseModel
from typing import List, Literal

class PredictionInput(BaseModel):
    temperature: float
    humidity: float
    pressure: float
    wind_speed: float
    satellite_value: float

class BatchPredictionInput(BaseModel):
    data: List[PredictionInput]

class PredictionResult(BaseModel):
    prediction: int
    probability: float

# Pour la carte : prédictions géolocalisées avec risque
class GeoPrediction(BaseModel):
    id: int
    lat: float
    lng: float
    datePrediction: str
    temperature: float
    rainfall: float
    event_type: Literal["tempête", "inondation", "sécheresse", "cyclone", "aucun"]
    risk_level: Literal["faible", "modéré", "élevé", "critique"] 