# batch-3-assignment-2
### **Submission : (Please check my submissions:)**

- GitHub Repository URL (Server): https://github.com/ashiqee/batch-3-assignment-2 
- Live Server Link: https://batch-3-assignment-2.onrender.com/


**Objective:** Develop a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Zod.

# Product management API

This is a Product management API built with Express, Mongoose, and TypeScript.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashiqee/batch-3-assignment-2.git
   cd batch-3-assignment-2


2. Install dependencies:
### usi npm: 
```tsc
npm i
```
## Configuration
1. Create a  `.env` file in the root directory of the project and add the following enviroment variables:
```tsc
PORT=5000

DATABASE_URL= mongodb+srv://ecom-dbuser:Dfj5EATotOon0MF1@cluster0.ucf500e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Runnig the Application

1. To compile and run the TypeScript application in development mode with hot-reloading, use:
```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```
3. To start the build application:
```bash
npm run start:prod
```

## API Endpoints

- Products
    - `GET` `/api/products` - Get all products
    - `GET` `/api/products/?searchTerm=iphone` - Search any product match with name, tag and description.
    - `GET` `/api/products/:productId` - Get Sigle product by productId.
    - `POST` `/api/products` - Create a new product
    - `PUT` `/api/products/:productId` - Update a product by productId
    - `DELETE` `/api/products/:productId` - Delete a product by productId.

- Orders
    - `GET` `/api/orders` - Get all orders
    - `GET` `/api/orders/?email=level2@programming-hero.com` - Get orders by email
    - `POST` `/api/orders` - Create a new order


## Project Structure


```go
product-managment-api/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── products/
│   │   │   │   ├── products.controllers.ts
│   │   │   │   ├── products.model.ts
│   │   │   │   ├── products.route.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   ├── products.interface.ts
│   │   │   │   └── products.validation.ts
│   │   │   │  
│   │   │   ├── orders/
│   │   │   │   ├── orders.controllers.ts
│   │   │   │   ├── orders.model.ts
│   │   │   │   ├── orders.route.ts
│   │   │   │   ├── orders.service.ts
│   │   │   │   ├── orders.interface.ts
│   │   │   │   └── orders.validation.ts
│   │   ├─── config/
│   │       └── index.ts
│   ├── errors/
│   │   └── CustomError.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Additional Information
  - Environment Variables: Store all environment-specific configurations in the .env file.
 - Linting: The project uses ESLint for code quality and consistency.
- Formatting: The project uses Prettier for code formatting.

### **Validation with Zod**




