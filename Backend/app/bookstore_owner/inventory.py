from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from flask import jsonify
from .services.inventorybl import get_inventory, delete_data


class Inventory(Resource):
    @jwt_required()
    def get(self,email):
        return jsonify(get_inventory(email=email))
    
    @jwt_required()
    def delete(self,email):
        result = delete_data(email)
        if result:
            return {'message': 'Book deleted successfully'}, 200
        else:
            return {'message': 'Some error occured'}, 500