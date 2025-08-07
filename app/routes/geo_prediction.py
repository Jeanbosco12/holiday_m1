from fastapi import APIRouter
from typing import List
from app.schemas.prediction import GeoPrediction
from app.services.predict_geo_service import get_geo_predictions

router = APIRouter()

@router.get("/predictions", response_model=List[GeoPrediction])
def get_predictions():
    return get_geo_predictions()
