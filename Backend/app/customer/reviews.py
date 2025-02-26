from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource, reqparse
from flask import jsonify, make_response, request
import sqlite3
import jwt

class Reviews(Resource):
    def get(self, bookid):
        db = sqlite3.connect('database.db')
        cursor = db.cursor()
        cursor.execute("SELECT * FROM reviews WHERE bookid = ?",(bookid,))
        reviews = []
        for row in cursor.fetchall():
            review = {
                "id": row[0],
                "email": row[1],
                "bookid": row[2],
                "rating": row[3],
                "review": row[4]
            }
            reviews.append(review)
        return jsonify(reviews)
    
    @jwt_required()
    def post(self,bookid):
        authorization_header = request.headers.get('Authorization')
        print(authorization_header)
        print(get_jwt_identity())
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('bookid', type=str, required=True, help='Book Id is required')
        parser.add_argument('rating', type=int, required=True, help='Rating is required')
        parser.add_argument('review', type=str, required=True, help='Review is required')
        args = parser.parse_args()
        print(args)
        try:
            # Connect to the database
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()

            # Check the role and insert into the appropriate table
            
            cursor.execute('''INSERT INTO reviews (email, bookid, rating, review) VALUES (?, ?, ?, ?)''',
                        (args['email'], args['bookid'], args['rating'], args['review']))

            # Commit changes and close connection
            conn.commit()
            conn.close()
            return {'message': 'Review submitted successfully'}, 201
        except:
            return {'message': 'Some error occured'}, 500
        