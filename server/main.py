import speech_recognition as sr
from flask import Flask, jsonify



app = Flask(__name__)
@app.route('/api/greet', methods=['GET'])
def greet():
    return jsonify(message="Ahoy, World!")
@app.route('/api/transcribe', methods=['GET'])
def transcribe():
    r = sr.Recognizer()
    # audio object                                                         
    audio = sr.AudioFile("harvard.wav")
    #read audio object and transcribe
    with audio as source:
        audio = r.record(source)                  
        result = r.recognize_google(audio)
    
    print(result)
    return jsonify(message=result)
if __name__ == '__main__':
    app.run(debug=True)