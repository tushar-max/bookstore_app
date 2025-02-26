from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
import sqlite3

class BuyBook(Resource): 
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('customerid', type=str, required=True, help='Customer email is required')
        parser.add_argument('bookid', type=str, required=True, help='Book Id is required')
        parser.add_argument('booktitle', type=str, required=True, help='Book title is required')
        parser.add_argument('orderdate', type=str, required=True, help='Order date is required')
        parser.add_argument('orderstatus', type=str, required=True, help='Order status is required')
        args = parser.parse_args()
        print(args)
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''INSERT INTO orders (customerid, bookid, booktitle, orderdate, orderstatus) VALUES (?, ?, ?, ?, ?)''',
                        (args['customerid'], args['bookid'], args['booktitle'], args['orderdate'],args['orderstatus']))
            # Commit changes and close connection
            cursor1 = conn.cursor()
            cursor1.execute('''SELECT quantity FROM books WHERE id=?''',(args['bookid']))
            qty_tuple = cursor1.fetchone()
            if qty_tuple is not None:
                qty=qty_tuple[0]
                if qty>0:
                    cursor2 = conn.cursor()
                    cursor2.execute('''UPDATE books SET quantity=? WHERE id=?''',(qty-1,args['bookid'],))
                else:
                    return {'message': 'Book is out of stock'}, 404
            conn.commit()
            conn.close()
            return {'message': 'Order Placed successfully'}, 201
        except Exception as e:
            print(e)
            return {'message': 'Some error occured'}, 500
        