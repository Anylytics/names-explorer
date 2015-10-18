from flask import Flask, render_template, abort, request, jsonify, g
import sqlite3, math, json


DATABASE = '../stateData.db'

app = Flask(__name__)


##Define SQL Functions
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db()
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def connect_db():
    return sqlite3.connect(DATABASE)

@app.route('/')
def home_page():
    return render_template('index.html')


@app.route('/getNamesByYear/<year>')
def find_namesByYear(year):
	data = []
	c = get_db().cursor()
	for row in c.execute('SELECT Name, Frequency FROM stateNames WHERE Year=?', [year]):
		data.append({"name":row[0], "frequency":row[1]})
	return jsonify(names=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug='True')