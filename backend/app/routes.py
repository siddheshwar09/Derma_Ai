# app/routes.py

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os
import tempfile

from app.model_loader import model
from app.utils import get_guidance
from app.location import find_dermatologists

router = APIRouter()

class_names = ['Eczema', 'Melanocytic_Nevi', 'Melanoma']

CONFIDENCE_THRESHOLD = 0.20


@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):

    # Read uploaded image
    contents = await file.read()
    img_pil = Image.open(io.BytesIO(contents)).convert("RGB")

    # Save temporarily so tf.keras.preprocessing.image.load_img can read it
    # This ensures exact same preprocessing as your notebook training code
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp_path = tmp.name
        img_pil.save(tmp_path)

    # Load and preprocess exactly as in notebook (no manual normalization)
    image = tf.keras.preprocessing.image.load_img(tmp_path, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to batch (matches notebook)

    # Clean up temp file
    os.remove(tmp_path)

    # Ensure model is loaded
    if model is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail="Model not available on server. Contact admin.")

    # Predict
    try:
        prediction = model.predict(input_arr)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Prediction failed: {e}")

    result_index = np.argmax(prediction)
    confidence = float(np.max(prediction))
    model_prediction = class_names[result_index]

    # 🔒 Low confidence safety check
    if confidence < CONFIDENCE_THRESHOLD:
        return {
            "condition": "Uncertain",
            "confidence": round(confidence, 4),
            "message": "Prediction confidence is low. Please consult a certified dermatologist.",
            "disclaimer": "This tool provides informational guidance only and does not replace professional medical diagnosis."
        }

    # Get Do's and Don'ts
    guidance = get_guidance(model_prediction)

    # Find nearby dermatologists (FREE OSM)
    nearby_doctors = find_dermatologists(latitude, longitude)

    # 🚨 Urgent flag for Melanoma
    urgent_flag = True if model_prediction == "Melanoma" else False

    response = {
        "condition": model_prediction,
        "confidence": round(confidence, 4),
        "dos": guidance["dos"],
        "dont": guidance["dont"],
        "urgent": urgent_flag,
        "nearby_dermatologists": nearby_doctors,
        "disclaimer": "This tool provides informational guidance only and does not replace professional medical diagnosis."
    }

    # Debugging helper: include raw model scores when DEBUG_PREDICTION=1
    if os.getenv("DEBUG_PREDICTION") == "1":
        try:
            response["raw_prediction"] = prediction[0].tolist()
        except Exception:
            response["raw_prediction"] = []
        response["result_index"] = int(result_index)

    return response