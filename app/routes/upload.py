from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter()

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    upload_folder = "uploaded_data"
    os.makedirs(upload_folder, exist_ok=True)
    
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {"message": f"{file.filename} uploaded successfully"}