from fastapi import APIRouter
from collections import Counter
from typing import List
from app.schemas.prediction import GeoPrediction

router = APIRouter()

# Ici, simuler ou récupérer la liste de toutes les prédictions
def get_all_predictions() -> List[GeoPrediction]:
    # Exemple statique, à remplacer par ta source de données réelle (base, cache, fichier, etc.)
    return [
        GeoPrediction(id=1, lat=-18.9, lng=47.5, datePrediction="2025-08-25", temperature=27.5, rainfall=12.3, event_type="tempête", risk_level="élevé"),
        GeoPrediction(id=2, lat=-19.1, lng=46.8, datePrediction="2025-08-28", temperature=33.2, rainfall=2.0, event_type="sécheresse", risk_level="modéré"),
        GeoPrediction(id=3, lat=-20.0, lng=44.1, datePrediction="2025-09-01", temperature=28.1, rainfall=0.5, event_type="aucun", risk_level="faible"),
        # Ajoute tes prédictions dynamiques ici
    ]

@router.get("/summary")
def get_summary():
    preds = get_all_predictions()
    counts = Counter()

    for p in preds:
        event = p.event_type.lower()
        if event == "tempête":
            counts["tempetes"] += 1
        elif event == "inondation":
            counts["inondations"] += 1
        elif event == "séisme":
            counts["seismes"] += 1
        elif event == "volcan":
            counts["volcan"] += 1
        elif event == "sécheresse":
            counts["secheresse"] += 1
        elif event == "cyclone":
            counts["cyclones"] += 1
        else:
            # Ignorer ou autres événements
            pass

    summary = {
        "cyclones": counts.get("cyclones", 0),
        "inondations": counts.get("inondations", 0),
        "seismes": counts.get("seismes", 0),
        "volcan": counts.get("volcan", 0),
        "secheresse": counts.get("secheresse", 0),
        "tempetes": counts.get("tempetes", 0),
    }
    return summary
