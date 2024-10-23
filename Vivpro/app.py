# app.py

from flask import Flask
from api import api

app = Flask(__name__)
app.json.sort_keys = False 
app.register_blueprint(api)

if __name__ == '__main__':
    app.run(debug=True)
