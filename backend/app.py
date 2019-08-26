import numpy as np
from music21 import *
import librosa

from flask import Flask
from flask import jsonify
from flask_cors import CORS

import os
from flask import flash, request, redirect
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

def getSync(path):
    y, sr = librosa.load(path)
    onset_env = librosa.onset.onset_strength(y, sr=sr, aggregate=np.median)
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    beatsTime = librosa.frames_to_time(beats, sr=sr)

    return jsonify({
        "bpm": tempo,
        "startTime": beatsTime[0]
    })

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['xml', 'mp3'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload/<type>', methods=['GET', 'POST'])
def upload_file(type):
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            if type == 'sheetmusic':
                path = os.path.join(app.config['UPLOAD_FOLDER'], 'sheetmusic', filename)
                file.save(path)
                s = converter.parseFile(path)
                return jsonify({"keySigLower": s.getTimeSignatures()[0].denominator})
            elif type == 'backtrack':
                path = os.path.join(app.config['UPLOAD_FOLDER'], 'backtrack', filename)
                file.save(path)
                return getSync(path)
