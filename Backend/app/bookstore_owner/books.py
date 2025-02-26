from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from flask import jsonify
from .services.books_bl import get_data, add_data,update_data


class BookAPI(Resource):
    def get(self):
        return jsonify(get_data())
    
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True, help='Title is required')
        parser.add_argument('author', type=str, required=True, help='Author is required')
        parser.add_argument('genre', type=str, required=True, help='Genre is required')
        parser.add_argument('price', type=int, required=True, help='Price is required')
        parser.add_argument('date', type=str, required=True, help='Date is required')
        parser.add_argument('quantity', type=int, required=True, help='Quantity is required')
        parser.add_argument('bookstoreid', type=str, required=True, help='Bookstore ID is required')
        args = parser.parse_args()
        print(args)
        result = add_data(args=args)
        if result == True:
            return {'message': 'Book added successfully'}, 201
        else:
            return {'message':'Unexpected error occured'}, 500

    @jwt_required()
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id',type=int, required=True, help='Title is required')
        parser.add_argument('title', type=str, required=True, help='Title is required')
        parser.add_argument('author', type=str, required=True, help='Author is required')
        parser.add_argument('genre', type=str, required=True, help='Genre is required')
        parser.add_argument('price', type=int, required=True, help='Price is required')
        parser.add_argument('date', type=str, required=True, help='Date is required')
        parser.add_argument('quantity', type=int, required=True, help='Quantity is required')
        args = parser.parse_args()
        book_id = args['id']
        print(args)
        result = update_data(book_id,args)
        if result:
            return {'message': 'Book updated successfully'}, 200
        else:
            return {'message': 'Some error occured'}, 500