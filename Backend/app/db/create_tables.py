import sqlite3
from flask import g

class CreateDb:
    
    def create_table(app):
        def get_db(app):
            db = getattr(g, '_database', None)
            if db is None:
                db = g._database = sqlite3.connect(app.config['DATABASE'])
            return db
        with app.app_context():
            db = get_db(app)
            cursor = db.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS customer (
                            id INTEGER PRIMARY KEY,
                            name TEXT,
                            email TEXT,
                            phone INTEGER,
                            password TEXT,
                            Role TEXT)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS storeowner (
                            id INTEGER PRIMARY KEY,
                            name TEXT,
                            email TEXT,
                            phone INTEGER,
                            password TEXT,
                            Role TEXT)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS books (
                            id INTEGER PRIMARY KEY,
                            title TEXT,
                            author TEXT,
                            genre TEXT,
                            price INTEGER,
                            date TEXT,
                            quantity INTEGER,
                            bookstoreid INTEGER)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS reviews (
                            id INTEGER PRIMARY KEY,
                            email TEXT,
                            bookid INTEGER,
                            rating INTEGER,
                            review TEXT)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS orders (
                            id INTEGER PRIMARY KEY,
                            customerid TEXT,
                            bookid TEXT,
                            booktitle TEXT,
                            orderdate TEXT,
                            orderstatus TEXT)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS cart (
                            id INTEGER PRIMARY KEY,
                            customerid TEXT,
                            bookid TEXT,
                            booktitle TEXT)''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS admin (
                            id INTEGER PRIMARY KEY,
                            name TEXT,
                            email TEXT,
                            password TEXT,
                            Role TEXT)''')
            db.commit()