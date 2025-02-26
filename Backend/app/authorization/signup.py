from flask_restful import Resource, reqparse
from flask import jsonify
import sqlite3

class SignUp(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='Username is required')
        parser.add_argument('email', type=str, required=True, help='Username is required')
        parser.add_argument('phone', type=int, required=True, help='Username is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('role', type=str, required=True, help='Role is required')
        args = parser.parse_args()
        print(args)
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()
            
            # Check if the email already exists in either table
            cursor.execute("SELECT * FROM customer WHERE email=?", (args['email'],))
            existing_customer = cursor.fetchone()
            cursor.execute("SELECT * FROM storeowner WHERE email=?", (args['email'],))
            existing_storeowner = cursor.fetchone()

            if existing_customer or existing_storeowner:
                conn.close()
                return {'message': 'Email already in use'}, 400

            # Check the role and insert into the appropriate table
            if args['role'] == 'customer':
                cursor.execute('''INSERT INTO customer (name, email, phone, password, Role) VALUES (?, ?, ?, ?, ?)''',
                            (args['name'], args['email'], args['phone'], args['password'], args['role']))
            elif args['role'] == 'storeowner':
                cursor.execute('''INSERT INTO storeowner (name, email, phone, password, Role) VALUES (?, ?, ?, ?, ?)''',
                            (args['name'], args['email'], args['phone'], args['password'], args['role']))
            else:
                return jsonify({'message': 'Invalid role'}), 400

            # Commit changes and close connection
            conn.commit()
            conn.close()
            return {'message': 'User signed up successfully'}, 201
        except:
            return {'message': 'Some error occured'}, 500
        