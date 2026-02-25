# app/utils.py

def get_guidance(condition):
    guidance = {
        "Eczema": {
            "dos": [
                "Apply moisturizer regularly",
                "Use mild, fragrance-free soap",
                "Keep skin hydrated"
            ],
            "dont": [
                "Avoid scratching",
                "Avoid very hot showers",
                "Avoid harsh chemical products"
            ]
        },

        "Melanocytic_Nevi": {
            "dos": [
                "Monitor mole size and color regularly",
                "Use sunscreen daily",
                "Consult doctor if changes occur"
            ],
            "dont": [
                "Do not ignore sudden changes",
                "Avoid excessive sun exposure"
            ]
        },

        "Melanoma": {
            "dos": [
                "Consult a dermatologist immediately",
                "Schedule a medical skin examination"
            ],
            "dont": [
                "Do not delay medical consultation",
                "Do not attempt self-treatment"
            ]
        }
    }

    return guidance.get(condition, {"dos": [], "dont": []})
