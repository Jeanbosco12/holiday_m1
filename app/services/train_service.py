#train_service.py
import pandas as pd
from app.models.rna_model import RNAModel

def train_model_from_csv(csv_path: str):
    df = pd.read_csv(csv_path)

    if 'target' not in df.columns:
        raise ValueError("Le CSV doit contenir la colonne 'target'.")


    X = df.drop(columns=["target"])
    y = df["target"]

    model = RNAModel()
    model.train(X, y)
    model.save_model("model/rna_model.pkl")
