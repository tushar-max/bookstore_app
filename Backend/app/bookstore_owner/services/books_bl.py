import sqlite3
from flask import jsonify

from app.model.book import Book

def get_data():
    db = sqlite3.connect('database.db')
    cursor = db.cursor()
    cursor.execute("SELECT * FROM books")
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

    
def add_data(args):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM storeowner WHERE email = ?",(args['bookstoreid'],))
        owner = cursor.fetchone()
        if not owner:
            return False
        else:
        # Inserting new book into the database
            cursor.execute("INSERT INTO books (title, author, genre, price, date, quantity, bookstoreid) VALUES (?, ?, ?, ?, ?,?, ?)",
                            (args['title'], args['author'], args['genre'], args['price'], args['date'],args['quantity'], owner[0]))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(e)
        return False
# Update
def update_data(book_id,args):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        # Update book details in the database
        update_query = "UPDATE books SET "
        updates = []
        for key, value in args.items():
            if value is not None:
                updates.append(f"{key} = '{value}'")
        update_query += ", ".join(updates) + f" WHERE id = {book_id}"
        cursor.execute(update_query)
        conn.commit()
        conn.close()
        return True
    except:
        return False

# Delete
def delete_data(book_id):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        # Check if the book exists
        cursor.execute("SELECT * FROM books WHERE id=?", (book_id,))
        book = cursor.fetchone()
        if book is None:
            conn.close()
            return {'message': 'Book not found'}, 404

        # Delete the book from the database
        cursor.execute("DELETE FROM books WHERE id=?", (book_id,))
        conn.commit()
        conn.close()
        return True
    except:
        return False
    
def get_book_by_id(book_id):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        # Get the book by ID from the database
        cursor.execute("SELECT * FROM books WHERE id=?", (book_id,))
        book = cursor.fetchone()
        conn.close()

        if book:
            # Convert the book tuple to a dictionary
            book_dict = {
                'id': book[0],
                'title': book[1],
                'author': book[2],
                'genre': book[3],
                'price': book[4],
                'date': book[5],
                'quantity': book[6],
                'bookstoreid': book[7]
            }
            return jsonify(book_dict)
        else:
            return {'message': 'Book not found'}, 404
    except:
        return {'message': 'Some error occured'}, 500