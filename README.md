# Product Order Management Backend

This is a Basic backend API for managing an e-commerce platform, including features like product management, order creation, and inventory updates .

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technology Used](#technology-used)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Licenses](#licenses)

## Requirements

Before starting the project we should ensure that we have the following software installed:

- **Node.js** (v14 or higher)
- **MongoDB** (Running locally or a cloud-based instance such as MongoDB Atlas)
- **NPM or Yarn** for package management

## Installation

1. Clone the repository:

```
   git clone https://github.com/forhadislamse/product-order-management-backend.git
   cd product-order-management-backend
   <!-- Using npm: -->

   npm install
   <!-- Or, using yarn: -->

   yarn install
```

2. Create a .env file in the root of the project directory to store environment variables. Example .env file:

```
   PORT=port number
   DATABASE_URL=mongodb atlas connection
```

## Running the Application

We can run the application using the following npm scripts:

### **1. Build the application:**

This command compiles the TypeScript files into JavaScript files:

`npm run build`

### **2. Start the application:**

After building the application, we can start it with the following command:

`npm run start`

### **3. Start the application in development mode:**

For development, we use the start:dev script, which runs the application using ts-node-dev, so it will automatically reload on file changes:

`npm run start:dev`

### **4. Start the application in production mode with nodemon:**

This script uses nodemon to restart the application automatically when changes occur in the compiled JavaScript files:

`npm run start:prod`

### **5. Linting:**

To run ESLint and check for code issues, use the following command:

`npm run lint`

To automatically fix linting issues, use:

`npm run lint:fix`

### **6. Prettier:**

To automatically format your code with Prettier (ignoring .gitignore files), use this command:

`npm run prettier:fix`

## Features

- **Products:** Create, Retrieve, Update, Delete, and Search by searchTerm
- **Orders:** Create, Retrieve, and Search by email
- Before order created check products and inventory updates
- Validation using Zod
- Project set up with eslint and prettier

## Technologies Used

- **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript.
- **[MongoDB](https://www.mongodb.com/)**: Flexible, scalable, and high-performance NoSQL database that utilizes a document-oriented data model
- **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js.
- **[Zod](https://github.com/colinhacks/zod)**: TypeScript-first schema declaration and validation library.
- **[ESlint](https://eslint.org/)**: Find and fix problems in your JavaScript code.
- **[Prettier]https://prettier.io/docs/)**: Prettier is an opinionated code formatter.

## Folder Structure

```
src
├── app
│ ├── config
│ │ └── index.ts
│ └── modules
│ ├── order
│ │ ├── order.controllers.ts
│ │ ├── order.interface.ts
│ │ ├── order.model.ts
│ │ ├── order.routes.ts
│ │ ├── order.services.ts
│ │ └── order.zodValidation.ts
│ └── product
│ ├── product.controllers.ts
│ ├── product.interface.ts
│ ├── product.model.ts
│ ├── product.routes.ts
│ ├── product.services.ts
│ └── product.zodValidation.ts
├── app.ts
└── server.ts
```

## API Endpoints

### Product Management

#### **1. Create a New Product**

- **Endpoint**: **`/api/products`**
- **Method:** `POST`
- **Sample Request Body**:

```json
{
  "name": "iPhone SE Pro",
  "description": "Compact and affordable iPhone model with powerful performance.",
  "price": 499,
  "category": "Smartphones",
  "tags": ["iPhone", "Apple", "Mobile"],
  "variants": [
    {
      "type": "Color",
      "value": "White"
    },
    {
      "type": "Storage",
      "value": "128GB"
    }
  ],
  "inventory": {
    "quantity": 40,
    "inStock": true
  }
}
```

-- **Sample Response**:

```json
{
  "success": true,
  "message": "Product created successfully!",
  "data": {
    "name": "iPhone SE Pro",
    "description": "Compact and affordable iPhone model with powerful performance.",
    "price": 499,
    "category": "Smartphones",
    "tags": ["iPhone", "Apple", "Mobile"],
    "variants": [
      {
        "type": "Color",
        "value": "White",
        "_id": "67acc6df58b9b37044d3cff3"
      },
      {
        "type": "Storage",
        "value": "128GB",
        "_id": "67acc6df58b9b37044d3cff4"
      }
    ],
    "inventory": {
      "quantity": 40,
      "inStock": true,
      "_id": "67acc6df58b9b37044d3cff5"
    },
    "_id": "67acc6df58b9b37044d3cff2"
  }
}
```

#### **2. Retrieve a List of All Products**

- **Endpoint**: **`/api/products`**
- **Method:** `GET`
- **Sample Response**:

```json
{
  "success": true,
  "message": "Products fetched successfully!",
  "data": [
    {
      "_id": "67a99288e5a09dadb62ef299",
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue",
          "_id": "67a99288e5a09dadb62ef29a"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB",
          "_id": "67a99288e5a09dadb62ef29b"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true,
        "_id": "67a99288e5a09dadb62ef29c"
      }
    }
    // Additional products can be added here...
  ]
}
```

#### **3. Retrieve a Specific Product by ID**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `GET`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "specific Product fetched successfully!",
  "data": {
    "_id": "67a9974a73c5e95c33f502b2",
    "name": "Bluetooth Speaker",
    "description": "Portable Bluetooth speaker with high-fidelity sound and long battery life.",
    "price": 59.99,
    "category": "Electronics",
    "tags": ["audio", "portable", "wireless", "speaker"],
    "variants": [
      {
        "type": "color",
        "value": "Blue",
        "_id": "67a9974a73c5e95c33f502b3"
      },
      {
        "type": "color",
        "value": "Red",
        "_id": "67a9974a73c5e95c33f502b4"
      }
    ],
    "inventory": {
      "quantity": 200,
      "inStock": true,
      "_id": "67a9974a73c5e95c33f502b5"
    }
  }
}
```

#### **4. Update Product Information**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `PUT`**
- **Sample Request Body**:

```json
{
  "_id": "67a997da73c5e95c33f502d0",
  "name": "Electric Kettle",
  "description": "Stainless steel electric kettle with auto shut-off feature.",
  "price": 39.99,
  "category": "Kitchen Items",
  "tags": ["kitchen", "appliance", "electric", "kettle"],
  "variants": [
    {
      "type": "capacity",
      "value": "1.5L",
      "_id": "67a997da73c5e95c33f502d1"
    },
    {
      "type": "capacity",
      "value": "2L",
      "_id": "67a997da73c5e95c33f502d2"
    }
  ],
  "inventory": {
    "quantity": 60,
    "inStock": true,
    "_id": "67a997da73c5e95c33f502d3"
  }
}
```

- **Sample Response**:

```json
{
  "success": true,
  "message": "Product updated successfully!",
  "data": {
    "_id": "67a997da73c5e95c33f502d0",
    "name": "Electric Kettle",
    "description": "Stainless steel electric kettle with auto shut-off feature.",
    "price": 39.99,
    "category": "Kitchen",
    "tags": ["kitchen", "appliance", "electric", "kettle"],
    "variants": [
      {
        "type": "capacity",
        "value": "1.5L",
        "_id": "67a997da73c5e95c33f502d1"
      },
      {
        "type": "capacity",
        "value": "2L",
        "_id": "67a997da73c5e95c33f502d2"
      }
    ],
    "inventory": {
      "quantity": 60,
      "inStock": true,
      "_id": "67a997da73c5e95c33f502d3"
    }
  }
}
```

#### **5. Delete a Product**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `DELETE`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "Product deleted successfully!",
  "data": null
}


// The product should be deleted from the database.
```

#### **6. Search a product**

- **Endpoint**: `/api/products?searchTerm=Yoga Mat`
- **Method: GET**
- **Sample Response**:

```jsx
{
    "success": true,
    "message": "Products matching search term 'Yoga Mat' fetched successfully!",
    "data": [
        {
            "_id": "67aa0d40790f1190252038e8",
            "name": "Yoga Mat",
            "description": "Eco-friendly yoga mat with non-slip surface.",
            "price": 24.99,
            "category": "Fitness",
            "tags": [
                "yoga",
                "fitness",
                "eco-friendly",
                "non-slip"
            ],
            "variants": [
                {
                    "type": "color",
                    "value": "Green",
                    "_id": "67aa0d40790f1190252038e9"
                },
                {
                    "type": "color",
                    "value": "Purple",
                    "_id": "67aa0d40790f1190252038ea"
                }
            ],
            "inventory": {
                "quantity": 75,
                "inStock": true,
                "_id": "67aa0d40790f1190252038eb"
            }
        }
    ]
}
```

## Order Management

### **Order Management API Endpoints**

#### **1.Create a New Order**

- **Endpoint**: **`/api/orders`**
- **Method: `POST`**
- **Request Body**:

```json
{
  "email": "ab2@domain.com",
  "productId": "67aa0da1790f1190252038ef",
  "price": 11,
  "quantity": 10
}
```

- **Response**:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": {
    "email": "ab2@domain.com",
    "productId": "67aa0da1790f1190252038ef",
    "price": 11,
    "quantity": 10,
    "_id": "67acce01dfe9204794dd8f70"
  }
}
```

#### **2.Retrieve All Orders**

- **Endpoint**: **`/api/orders`**
- **Method: `GET`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "Orders fetched successfully!",
  "data": [
    {
      "_id": "67ab59b6acf6536334ca9d1c",
      "email": "level2@programming-hero.com",
      "productId": "67a99288e5a09dadb62ef299",
      "price": 999,
      "quantity": 1
    },
    {
      "_id": "67ab5aaeacf6536334ca9d1e",
      "email": "alice@example.com",
      "productId": "67a993e952915940858fbdc9",
      "price": 1599,
      "quantity": 2
    }
    // more orders...
  ]
}
```

#### **3. Retrieve Orders by User Email**

- **Endpoint**: `/api/orders?email=level2@programming-hero.com`
- **Method:** `GET`
- **Sample Response**:

```json
{
  "success": true,
  "message": "Orders fetched successfully for user email 'bobmar@domain.com'",
  "data": [
    {
      "_id": "67ab5bf0be17ce126d1b1753",
      "email": "bobmar@domain.com",
      "productId": "5fd67e890b60c903cd8549a5",
      "price": 499,
      "quantity": 10
    },
    {
      "_id": "67ab63a975d8216cea518291",
      "email": "bobmar@domain.com",
      "productId": "67aad36f521c9e9190f12899",
      "price": 499,
      "quantity": 12
    }
  ]
}
```

### **Error Handling:**

**Sample Error Responses**

- Insufficient Quantity Error: product.inventory.quantity < quantity

```jsx
{
    "success": false,
    "message": "Insufficient quantity available in inventory"
}

```

- Not Found Error: if no product exist by searching productId then no order created

```jsx
{
 "success": false,
 "message": "Product not found"
}
```

- Not Found Route: if no matching routes then response will be

```jsx
{
 "success": false,
 "message": "Route not found"
}
```
