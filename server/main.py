from flask import Flask, request, jsonify
from flask_cors import CORS
from pydub import AudioSegment
import speech_recognition as sr
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify(error="No file provided"), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="Empty filename"), 400
    
    # Save the uploaded file
    mp3_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(mp3_path)

    try:
        # Convert MP3 to WAV
        wav_path = os.path.splitext(mp3_path)[0] + '.wav'
        audio = AudioSegment.from_mp3(mp3_path)
        audio.export(wav_path, format="wav")

        # Transcribe the WAV file
        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            result = recognizer.recognize_google(audio_data, language='ru-RU')

        # Clean up temporary files
        os.remove(mp3_path)
        os.remove(wav_path)

        return jsonify(message=result)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)