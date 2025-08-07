from fastapi import FastAPI
from app.schemas.prediction import PredictionInput, PredictionResult
from app.services.predict_service import predict_single
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, summary, geo_prediction, train_online

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Serveur de prédiction des catastrophes naturelles"}

@app.post("/predict", response_model=PredictionResult)
def predict(input_data: PredictionInput):
    features = [
        input_data.temperature,
        input_data.humidity,
        input_data.pressure,
        input_data.wind_speed,
        input_data.satellite_value,
    ]
    prediction, probability = predict_single(features)
    return PredictionResult(prediction=prediction, probability=probability)

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(geo_prediction.router, prefix="/api", tags=["Prediction"])
app.include_router(train_online.router, prefix="/api", tags=["Training"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])