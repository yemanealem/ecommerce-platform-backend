# Ecommerce Platform Backend

Backend REST API for an E-commerce platform built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/yemanealem/ecommerce-platform-backend.git
cd ecommerce-platform-backend

2. Install dependencies
 npm install

3. Create a .env file in the root directory with the following variables:
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

4. Run the development server
  npm run dev

The server will start on http://localhost:5000.


Technology Stack

    Node.js: Backend runtime

    TypeScript: Type safety and better code structure

    Express.js: REST API framework

    MongoDB: Database for users, products, and orders

    Mongoose: ODM for MongoDB

    JWT: Authentication and authorization

    UUID: Unique identifiers for entities

    dotenv: Environment variable management



##  Architecture Overview

The project follows Clean Architecture principles:

Project Structure
src/
├── entities/        # Core business objects independent of frameworks
├── usecases/        # Application logic and business rules
├── interfaces/      # Contracts for repositories and services
├── frameworks/      # Framework-specific code: MongoDB models, Express routes, middleware
├── utils/           # Reusable utility functions
└── main.ts          # Application bootstrap

Definitions

entities/: Defines core domain models like User, Product, and Order. Independent of database or frameworks.

usecases/: Implements business rules and application logic for authentication, products, and orders.

interfaces/: Contains abstract repository and service contracts to decouple business logic from implementations.

frameworks/: Includes Express route handlers, middleware, MongoDB repository implementations, and server setup.

utils/: Provides helper functions like validation, pagination, and standardized response formatting.

main.ts: Entry point of the application that initializes the database and starts the server.



Utilities: Response formatting, validation, pagination.


##  Database Models
1) User

    id: UUID (primary key)

    username: string

    email: string

    password: string (hashed)

    role: USER or ADMIN

    createdAt, updatedAt: Date

2) Product

    product_uuid: UUID (primary key)

    name: string

    description: string

    price: number

    stock: number

    category: string

    userId: UUID (foreign key to User)

    createdAt, updatedAt: Date

3) Order

    id: UUID (primary key)

    userId: UUID (foreign key to User)

    products: Array of { productId: UUID, quantity: number }

    description: string

    totalPrice: number

    status: PENDING, COMPLETED, CANCELLED

    createdAt, updatedAt: Date



#   User Stories Implemented
1. User Management

    Register and login users

    Role-based access control (USER, ADMIN)

2. Product Management

    Create, update, delete products (ADMIN only)

    List products with pagination (public)

    Get product by ID

2. Order Management

    Place orders (USER only, with stock validation and total price calculation)

    View order history (USER only, filtered by authenticated user)


#################################################################

.Middleware

    * Authentication: JWT verification, attaches user info to requests

    * Authorization: Role-based access control

    * Error Handling: Standardized API response format

. Utilities

    * Response Formatter: Standard success/error responses with success, message, object, errors

    * Pagination Formatter: Returns paginated product lists

     * Validation: Product data validation, stock checks during order placement

#################################################################################
##API Endpoints
User

    POST /auth/register – Register a new user

    POST /auth/login – Login user

Product

    POST /products – Create product (ADMIN)

    GET /products – Get paginated product list (Public)

    GET /products/:id – Get product by ID

    PUT /products/:id – Update product (ADMIN)

    DELETE /products/:id – Delete product (ADMIN)

Order

    POST /orders – Place order (USER)

    GET /orders – View order history (USER)

Notes

    All entity IDs use UUID.

    Relationships: Products and Orders reference userId.

    Transactions simulated for order placement using stock checks and error handling.

    Standardized API responses include success, message, object, and errors.


 #Next plan/features

Unit Testing: All HTTP requests are tested using mocks for the database to ensure reliable and isolated tests.

Caching: Implemented for the product listing endpoint to improve performance for repeated requests.

API Documentation: Clear API documentation for all endpoints using OpenAPI/Swagger or similar.

Product Image Uploads: Support for uploading and associating images with products.

Security Enhancements: Rate limiting and authentication middleware to prevent abuse and secure endpoints   