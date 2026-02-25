# src/predict.py

import numpy as np
import cv2

CLASS_NAMES = ["Eczema", "Melanocytic_Nevi", "Melanoma"]

def preprocess_image(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def predict_image(model, image_bytes):
    processed = preprocess_image(image_bytes)
    predictions = model.predict(processed)

    class_index = np.argmax(predictions)
    confidence = float(np.max(predictions))

    return CLASS_NAMES[class_index], confidence