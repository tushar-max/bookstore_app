from flask import jsonify
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import sqlite3

class ManageOrders(Resource): 
    @jwt_required()
    def get(self,email):
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''SELECT * FROM orders WHERE bookid IN (SELECT id FROM books WHERE bookstoreid IN (SELECT id FROM storeowner WHERE email = ?))''', (email,))

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
        
    # @jwt_required()
    def put(self,email):
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=int, required=True, help='Id is required')
            parser.add_argument('customerid', type=str, required=True, help='Customer email is required')
            parser.add_argument('bookid', type=str, required=True, help='Book Id is required')
            parser.add_argument('booktitle', type=str, required=True, help='Book title is required')
            parser.add_argument('orderdate', type=str, required=True, help='Order date is required')
            parser.add_argument('orderstatus', type=str, required=True, help='Order status is required')
            args = parser.parse_args()
            print(args)
            try:
                conn = sqlite3.connect('database.db')
                cursor = conn.cursor()

                # Update book details in the database
                update_query = "UPDATE orders SET "
                updates = []
                for key, value in args.items():
                    if value is not None:
                        updates.append(f"{key} = '{value}'")
                update_query += ", ".join(updates) + f" WHERE id = {args['id']}"
                # print(update_query)
                cursor.execute(update_query)
                conn.commit()
                conn.close()
                return {'message': 'Order Placed successfully'}, 201
            except:
                return {'message': 'Some error occured'}, 500