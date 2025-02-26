from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS

def create_app():
    
    app = Flask(__name__)
    app.config['DATABASE'] = 'database.db'
    app.config['JWT_SECRET_KEY'] = 'custom_secret_key_for_jwt'
    jwt = JWTManager(app)
    CORS(app)
    
    from .db.create_tables import CreateDb
    from .bookstore_owner.books import BookAPI
    from .bookstore_owner.book_by_id import IDBookAPI
    from .bookstore_owner.inventory import Inventory
    from .authorization.signup import SignUp
    from .authorization.auth import Authorization
    from .customer.reviews import Reviews
    from .customer.buybook import BuyBook
    from .customer.order import Orders
    from .customer.cart import Cart
    from .bookstore_owner.manage_orders import ManageOrders
    
    CreateDb.create_table(app)
    
    api = Api(app)
    api.add_resource(BookAPI, '/books')
    api.add_resource(IDBookAPI,'/books/<int:book_id>')
    api.add_resource(SignUp,'/signup')
    api.add_resource(Authorization,'/login')
    api.add_resource(Reviews,'/reviews/<int:bookid>')
    api.add_resource(BuyBook,'/buybook')
    api.add_resource(Orders,'/orders/<string:email>')
    api.add_resource(Cart,'/cart/<string:email>')
    api.add_resource(Inventory,'/inventory/<string:email>')
    api.add_resource(ManageOrders,'/manageOrders/<string:email>')
    return app