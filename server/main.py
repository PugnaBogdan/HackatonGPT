from flask import Flask, send_file, request
from flask_cors import CORS
from gtts import gTTS
import os
import tempfile

from musicGen import generateSong

app = Flask(__name__)
CORS(app) # Enables CORS for all routes

@app.route('/text_to_speech', methods=['POST'])
def text_to_speech():
    text = request.json['text']
    tts = gTTS(text)
    
    generateSong(text)
    # Ensure file is read in binary mode
    return send_file("2.wav", mimetype='audio/wav', as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)