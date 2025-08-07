import pickle
from sklearn.neural_network import MLPClassifier
import os

class RNAModel:
    def __init__(self):
        self.model = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=1000, random_state=42)

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X)

    def predict_proba(self, X):
        return self.model.predict_proba(X)

    def save_model(self, filepath):
        with open(filepath, "wb") as f:
            pickle.dump(self.model, f)

    def load_model(self, filepath: str):
        # Va chercher depuis la racine du projet NeuralModel/
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # -> NeuralModel/
        model_path = os.path.join(base_dir, filepath)

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"❌ Le modèle est introuvable : {model_path}")

        with open(model_path, 'rb') as f:
            self.model = pickle.load(f)
            print("✅ Modèle chargé avec succès depuis :", model_path)