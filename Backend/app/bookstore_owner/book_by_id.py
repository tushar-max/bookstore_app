from flask_restful import Resource, reqparse
from flask import jsonify
from .services.books_bl import get_book_by_id, get_data, add_data,update_data,delete_data


class IDBookAPI(Resource):
    def get(self,book_id):
        return get_book_by_id(book_id)

    def delete(self,book_id):
        result = delete_data(book_id)
        if result:
            return {'message': 'Book deleted successfully'}, 200
        else:
            return {'message': 'Some error occured'}, 500