from pathlib import Path

# Try to import TensorFlow only if available; allow server to start without it
try:
    from tensorflow.keras.models import load_model
    TENSORFLOW_AVAILABLE = True
except Exception:
    load_model = None
    TENSORFLOW_AVAILABLE = False

# Resolve model path relative to the backend package directory
BASE_DIR = Path(__file__).resolve().parent.parent
model_path = BASE_DIR / "models" / "trained_model.keras"

model = None

if not TENSORFLOW_AVAILABLE:
    print("⚠ TensorFlow not installed. Model loading is skipped. Install tensorflow to enable predictions.")
else:
    if model_path.exists():
        try:
            model = load_model(str(model_path))
            print("✅ Model Loaded Successfully", model_path)
        except Exception as e:
            print("❌ Failed to load model:", e)
            model = None
    else:
        print("❌ Model file NOT FOUND at:", model_path)
        model = None