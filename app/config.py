from pydantic import BaseSettings

class Settings(BaseSettings):
    model_path: str = "model/rna_model.pkl"

settings = Settings()
