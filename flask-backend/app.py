from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input
from joblib import load
from ultralytics import YOLO
from tensorflow.keras.models import Model
from tensorflow.keras.applications import EfficientNetB0

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['UPLOAD_FOLDER'] = 'Uploads/'

# Load the trained model and label encoder
voting_ensemble = load(r'C:\Users\deeks_5t46200\OneDrive\Desktop\S\SSI\flask-backend\SSI_Models\advanced_voting_ensemble_efficient_model.joblib')
label_encoder = load(r'C:\Users\deeks_5t46200\OneDrive\Desktop\S\SSI\flask-backend\SSI_Models\label_efficient_encoder.joblib')

# Initialize YOLOv8 model and EfficientNetB0
yolo_model = YOLO('yolov8s-seg.pt')
base_model = EfficientNetB0(weights='imagenet', include_top=False, pooling='avg', input_shape=(224, 224, 3))
feature_extractor = Model(inputs=base_model.input, outputs=base_model.output)

def preprocess_image(image, img_size=(224, 224)):
    return cv2.resize(image, img_size)

def apply_yolo_segmentation(image):
    results = yolo_model(image)
    if results[0].masks is not None:
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        for m in results[0].masks:
            current_mask = m.data.cpu().numpy().astype(np.uint8)
            current_mask = (current_mask * 255).squeeze()
            if current_mask.shape[:2] != image.shape[:2]:
                current_mask = cv2.resize(current_mask, (image.shape[1], image.shape[0]))
            mask = np.maximum(mask, current_mask)
        segmented_img = cv2.bitwise_and(image, image, mask=mask)
        return segmented_img
    else:
        return image

def extract_features(image):
    img = cv2.resize(image, (224, 224))
    img_array = np.expand_dims(img, axis=0)
    img_array = preprocess_input(img_array)
    features = feature_extractor.predict(img_array)
    return features.flatten()

def classify_image(image):
    segmented_image = apply_yolo_segmentation(image)
    features = extract_features(segmented_image).reshape(1, -1)
    
    # Get prediction and confidence scores
    prediction = voting_ensemble.predict(features)
    prediction_proba = voting_ensemble.predict_proba(features)
    max_confidence = np.max(prediction_proba)

    if max_confidence < 0.78:
        return "Not a recognized snake species", max_confidence

    predicted_class = label_encoder.inverse_transform(prediction)[0]
    return predicted_class, max_confidence

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(img_path)

    # Read image
    image = cv2.imread(img_path)
    if image is None:
        return jsonify({"error": "Invalid image file"}), 400

    # Classify the snake species
    predicted_class, confidence = classify_image(image)
    
    return jsonify({"predicted_class": predicted_class, "confidence": confidence})

if __name__ == '__main__':
    app.run(debug=True)
