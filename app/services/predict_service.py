from app.models.rna_model import RNAModel
import numpy as np
import os

model_path = os.path.join("model", "rna_model.pkl")
model = RNAModel()
model.load_model(model_path)

def predict_single(features: list) -> tuple:
    X = np.array(features).reshape(1, -1)
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1]
    return pred, prob
