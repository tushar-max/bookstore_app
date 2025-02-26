from datetime import timedelta
from flask_jwt_extended import create_access_token
from flask_restful import Resource, reqparse
from flask import jsonify
import sqlite3

class Authorization(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('role', type=str, required=True, help='Role is required')
        args = parser.parse_args()
        print(args)
        # Connect to the database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        # Check the role and find the user
        if args['role'] == 'customer':
            cursor.execute("SELECT * FROM customer WHERE email=? AND password=?", (args['email'], args['password']))
            user = cursor.fetchone()
        elif args['role'] == 'storeowner':
            cursor.execute("SELECT * FROM storeowner WHERE email=? AND password=?", (args['email'], args['password']))
            user = cursor.fetchone()
        else:
            conn.close()
            return {'message': 'Invalid role'}, 400

        if user:
            # Extract user information
            id, name, email, phone, _, role = user

            # Create JWT token with additional information
            access_token = create_access_token(identity=email, additional_claims={'role': role, 'phone': phone},expires_delta=timedelta(days=1))

            conn.close()
            return {'access_token': access_token}, 200
        else:
            conn.close()
            return {'message': 'Invalid credentials'}, 401