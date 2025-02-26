import sqlite3
from flask import jsonify

from app.model.book import Book

def get_inventory(email):
    db = sqlite3.connect('database.db')
    cursor = db.cursor()
    cursor.execute("SELECT * FROM storeowner WHERE email = ?",(email,))
    owner = cursor.fetchone()
    if not owner:
        return {'message': 'Book store owner not found'}, 404
    else:
        cursor.execute("SELECT * FROM books WHERE bookstoreid = ?",(owner[0],))
        books = []
        for row in cursor.fetchall():
            book = {
                "id": row[0],
                "title": row[1],
                "author": row[2],
                "genre": row[3],
                "price": row[4],
                "date": row[5],
                "quantity": row[6],
                "bookstoreid": row[7]
            }
            books.append(book)
        return books
    
def delete_data(id):
    try:
        id=int(id)
        db = sqlite3.connect('database.db')
        cursor = db.cursor()
        cursor.execute("DELETE FROM books WHERE id = ?",(id,))
        db.commit()
        db.close()
        return True
    except:
        return False