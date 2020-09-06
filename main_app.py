from flask import Flask , render_template , Response , jsonify , request ,session , redirect , url_for, send_from_directory, send_file, abort
from flask_mysqldb import MySQL

import json
import sqlite3

DATABASE_PATH = 'expense.db'
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn
# import database_operations as dbop
# from pprint import PrettyPrinter
# import os
# import sys
# import uuid
# p = PrettyPrinter()
App = Flask(__name__)
App.config['MYSQL_USER'] = 'root'
App.config['MYSQL_PASSWORD'] = ''
App.config['MYSQL_DB'] = 'expense'
App.config['MYSQL_CURSORCLASS'] = 'DictCursor'
App.config['MYSQL_HOST'] = 'localhost'
App.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
# App.config['UPLOAD_FOLDER'] = "static/uploads"
mysql = MySQL(App)
App.secret_key = 'any random string'

@App.route('/',methods=['GET'])
def login_view():
 
    return render_template('app/index.html')

@App.route('/home' , methods = ['GET'])
def homepage_view():
    if 'username' in session:
        return render_template('app/home.html')
    else :
        return redirect('/')

@App.route('/expense' , methods = ['GET'])
def add_expense_view():
    if 'username' in session:
        return render_template('app/expense.html')
    else :
        return redirect('/')
    
@App.route('/description' , methods = ['GET'])
def add_desc_view():
    if 'username' in session:
        return render_template('app/description.html')
    else :
        return redirect('/')
# END POINTS
def login(data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    query = """
        SELECT * FROM admin WHERE username = ? AND password = ?
    """
    c = conn.cursor()
    data = c.execute(query, (data['email'], data['password'])).fetchone()
    if data is None:
        print(1)
        # do something
        print('error')
        response = {"status_message": "error",
                    "status_code": 404}
    else:
        print(1)
        # do something
        print('i hope it worls')
        response = {"status_message": "successful",
                    "status_code": 200}
    conn.close()
    return response

@App.route('/login_dbop',methods = ['POST'])
def login_dbop_view():
    data = request.get_json()
    response = login(data)
    session['username'] = data['email']
    return jsonify(response)

def add(data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    query = """
        INSERT INTO expense(name, paid, price, date) VALUES (?, ?, ?, ?)
    """
    c = conn.cursor()
    data = c.execute(query, (data['name'], data['paid'], data['price'], data['dob']))
    conn.commit()
    conn.close()
    return {"success":"success"}

def add_project(data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    query = """
        INSERT INTO project(title, description, date) VALUES (?, ?, ?)
    """
    c = conn.cursor()
    data = c.execute(query, (data['title'], data['desc'], data['date']))
    conn.commit()
    conn.close()
    return {"success":"success"}

@App.route('/addexpense_dbop',methods = ['POST'])
def add_dbop_view():
    data = request.get_json()
    response = add(data)
    # session['username'] = data['email']
    return jsonify(response)

@App.route('/adddescription_dbop',methods = ['POST'])
def add_desc_dbop_view():
    data = request.get_json()
    response = add_project(data)
    # session['username'] = data['email']
    return jsonify(response)

def home():
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    data_query = 'SELECT * FROM expense Order BY date DESC'
    c = conn.cursor()
    data = c.execute(data_query).fetchall()
    print(data)
    adi = 'SELECT SUM(price) as sum FROM expense WHERE paid = 1'
    adi_sum = c.execute(adi).fetchone()['sum']
    print('adi',adi_sum)
    if adi_sum is None:
        adi_sum=0
   
    amey ='SELECT SUM(price) as sum FROM expense WHERE paid = 2'
    amey_sum = c.execute(amey).fetchone()['sum']
    if amey_sum is None:
        amey_sum=0
    
    abhi = 'SELECT SUM(price) as sum FROM expense WHERE paid = 3'
    abhi_sum = c.execute(abhi).fetchone()['sum']
    if abhi_sum is None:
        abhi_sum=0
    
    ani = 'SELECT SUM(price) as sum FROM expense WHERE paid = 4'
    ani_sum = c.execute(ani).fetchone()['sum']
    if ani_sum is None:
        ani_sum=0
    
    conn.close()
    response = { 'expense':data,
        'adi_sum':int(adi_sum),
        'amey_sum':int(amey_sum),
        'abhi_sum':int(abhi_sum),
        'ani_sum':int(ani_sum)}
    return response

@App.route('/home_dbop',methods = ['POST'])
def home_dbop_view():
    data = request.get_json()
    response = home()
    print(response)
    return jsonify(response)

if __name__ == "__main__":
    App.run(debug=True , threaded = True)