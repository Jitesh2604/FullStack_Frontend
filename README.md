# Product Store

## Description
Product Store is a full-stack application built with React for the frontend. The application allows two types of users: Admin and Customer. Admins can perform all CRUD operations on products, while Customers can add products to their cart, and remove or delete products from the cart.

## Features
- **Admin Features**:
  - Create, read, update, and delete products.
  
- **Customer Features**:
  - Add products to the cart.
  - Remove and delete products from the cart.
  
- **General**:
  - User authentication for Admin and Customers.
  - Responsive design for various screen sizes.

## Technologies
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: SCSS / Tailwind CSS (optional based on your choice)
  
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product_store.git
   cd product_store

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd server
npm install

# Create .env File
PORT=8000
MONGO_URL=your-mongodb-url
JWT_SECRET=your-jwt-secret
FRONTEND_PART_URL = https://full-stack-frontend-p22r.vercel.app/

# Start the frontend server 
npm run dev

# Start the backend server
node server.js

# Usage

# Admin
Admin users can manage products by performing CRUD operations:
Add new products.
Update product details.
Delete products.

# Customer
Regular users can browse products and:
Add items to their cart.
Remove items from the cart.

# API Documentation
POST /api/products - Add a new product (Admin only).
GET /api/products - Get all products.
PUT /api/products/:id - Update product by ID (Admin only).
DELETE /api/products/:id - Delete product by ID (Admin only).
POST /api/cart - Add product to cart.
DELETE /api/cart/:id - Remove product from cart by ID.

# Contributing
Feel free to open an issue or submit a pull request if you want to contribute to this project. Please follow the guidelines for contributing.

