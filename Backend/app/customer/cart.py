from flask import jsonify
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import sqlite3

class Cart(Resource): 
    @jwt_required()
    def get(self,email):
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''SELECT * FROM cart WHERE customerid = ?''',
                        (email,))

            # Commit changes and close connection
            carts = []
            for row in cursor.fetchall():
                cart = {
                    "id": row[0],
                    "customerid": row[1],
                    "bookid": row[2],
                    "booktitle": row[3],
                }
                carts.append(cart)
            conn.commit()
            conn.close()
            return jsonify(carts)
        except Exception as e:
            print(e)
            return {'message': 'Some error occured'}, 500
        
    @jwt_required()
    def post(self,email):
        parser = reqparse.RequestParser()
        parser.add_argument('customerid', type=str, required=True, help='Email is required')
        parser.add_argument('bookid', type=int, required=True, help='Book Id is required')
        parser.add_argument('booktitle', type=str, required=True, help='Book Title is required')
        args = parser.parse_args()
        print(args)
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''INSERT INTO cart (customerid, bookid, booktitle) VALUES (?, ?, ?)''',
                        (args['customerid'], args['bookid'], args['booktitle']))

            # Commit changes and close connection
            conn.commit()
            conn.close()
            return {'message': 'Added to cart successfully'}, 201
        except:
            return {'message': 'Some error occured'}, 500
    
    @jwt_required()
    def put(self,email):
        parser = reqparse.RequestParser()
        parser.add_argument('cartid', type=str, required=True, help='Cart Id is required')
        args = parser.parse_args()
        print(args)
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''DELETE FROM cart WHERE id= ?''',
                        (args['cartid']))

            # Commit changes and close connection
            conn.commit()
            conn.close()
            return {'message': 'Removed from cart successfully'}, 201
        except:
            return {'message': 'Some error occured'}, 500
        