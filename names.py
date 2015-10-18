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
	for row in c.execute('SELECT Name, Frequency FROM stateNames WHERE Year=? ORDER BY Frequency DESC LIMIT 100', [year]):
		data.append({"name":row[0], "frequency":row[1]})
	return jsonify(names=data)

@app.route('/getFrequencyOfNameByState/<name>/<year>')
def find_frequencyByYearByState(name, year):
	data = []
	c = get_db().cursor()
	for row in c.execute('SELECT Name, Frequency, State, Gender from stateNames WHERE Name = ? AND Year = ?', [name, year]):
		data.append({"name":row[0], "frequency":row[1], "state":row[2], "gender":row[3]})
	return jsonify(names=data)

@app.route('/getFrequencyOfName/<name>/<yearmin>/<yearmax>/<gender>')
def find_frequencyByYear(name, yearmin, yearmax, gender):
	data = []
	c = get_db().cursor()
	for row in c.execute('SELECT Name, SUM(Frequency), Year, Gender from stateNames WHERE Name = ? AND Year>=? AND YEAR<=? AND GENDER=? GROUP BY Year, Gender', [name, yearmin, yearmax, gender]):
		data.append({"name":row[0], "frequency":row[1], "year":row[2], "gender":row[3]})
	return jsonify(names=data)

@app.route('/names_suggest/<name_partial>')
def return_nameSuggestions(name_partial):
	data = []
	c = get_db().cursor()
	for row in c.execute('SELECT Name, SUM(Frequency) from stateNames WHERE Name LIKE ? GROUP BY Name ORDER BY SUM(Frequency) desc LIMIT 15', ['%'+name_partial+'%']):
		data.append({"value":row[0], "data":row[0]})
	return jsonify(suggestions=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug='True')