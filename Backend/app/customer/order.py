from flask import jsonify
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import sqlite3

class Orders(Resource): 
    @jwt_required()
    def get(self,email):
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''SELECT * FROM orders WHERE customerid = ?''',
                        (email,))

            # Commit changes and close connection
            orders = []
            for row in cursor.fetchall():
                order = {
                    "id": row[0],
                    "customerid": row[1],
                    "bookid": row[2],
                    "booktitle": row[3],
                    "orderdate": row[4],
                    "orderstatus": row[5]
                }
                orders.append(order)
            conn.commit()
            conn.close()
            return jsonify(orders)
        except Exception as e:
            print(e)
            return {'message': 'Some error occured'}, 500