from flask import Flask
from api import api

app = Flask(__name__) #__name__ is used to refer current module's name, which will help Flask to locate resources
app.json.sort_keys = False # flask returns the key order bydefault in alphabetical order
# to disable that, made it false
app.register_blueprint(api)
#Without registering the blueprint, Flask will have no knowledge of those routes,
# so if a user tries to access any of the API endpoints, they will get a "404 Not Found" error because the app won't recognize those routes.
if __name__ == '__main__':
    app.run(debug=True)
    #app.run starts flask server
    #  flask provides debugging mode - the app auto reloads when code changes are done
    #also shows error msg in browser ..makes easy to debug
