# Bookstore Application

## Overview

This is a full-stack Bookstore application that allows users to browse, purchase, and review books, while bookstore owners can manage inventory and orders. The application is built using:

- **Frontend**: Angular
- **Backend**: Flask
- **Database**: SQLite
- **Authentication**: JWT

## Features

### User Functionalities:
- Signup & Login
- View all books
- Add books to cart
- Purchase books
- Check book availability
- Write reviews and rate books
- Search books by title, author, or genre
- Track order status
- View order history

### Bookstore Owner Functionalities:
- Signup & Login
- View all books
- Manage inventory (add, edit, delete books)
- Manage order requests
- View customer reviews

## Installation and Setup

### Backend Setup (Flask):

Clone the repository:
```sh
git clone <repository_url>
```

Navigate to the backend directory:
```sh
cd backend
```

Create a virtual environment:
```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

Install dependencies:
```sh
pip install -r requirements.txt
```

Run the Flask backend:
```sh
python run.py
```

### Frontend Setup (Angular):

Navigate to the frontend directory:
```sh
cd frontend
```

Install dependencies:
```sh
npm install
```

Start the Angular application:
```sh
ng serve -o
```

The application will be accessible at [http://localhost:4200/](http://localhost:4200/).

## Database Design

The application uses SQLite as the database. The schema includes tables for:
- Users
- Books
- Orders
- Reviews

## Authentication

JWT (JSON Web Token) is used for secure authentication and user session management.

## API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication and token generation

### Books
- `GET /api/books` - Get all books
- `GET /api/books/<id>` - Get book details
- `POST /api/books` - Add a new book (Owner only)
- `PUT /api/books/<id>` - Update book details (Owner only)
- `DELETE /api/books/<id>` - Remove a book (Owner only)

### Orders
- `POST /api/orders` - Place an order
- `GET /api/orders/<id>` - Get order details
- `GET /api/orders/user` - Get all orders of a user
- `GET /api/orders/owner` - Get all orders for bookstore owner

### Reviews
- `POST /api/reviews` - Add a review for a book
- `GET /api/reviews/<book_id>` - Get all reviews for a book

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## License

This project is open-source and available under the MIT License.
