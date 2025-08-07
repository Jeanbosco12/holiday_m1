# train_model.py
import numpy as np
from app.models.rna_model import RNAModel
import os

# Création de données fictives (5 features)
X = np.random.rand(100, 5)  # 100 lignes, 5 colonnes (features météo/satellite)
y = np.random.randint(0, 2, 100)  # 100 labels (0 ou 1, catastrophe ou pas)

# Entraînement du modèle
model = RNAModel()
model.train(X, y)

# Sauvegarde du modèle entraîné
os.makedirs("model", exist_ok=True)
model.save_model("model/rna_model.pkl")

print("Modèle entraîné et sauvegardé avec succès.")
