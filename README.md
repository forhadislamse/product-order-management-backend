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

   ``
   git clone https://github.com/forhadislamse/product-order-management-backend.git
   cd product-order-management-backend
   <!-- Using npm: -->

   npm install
   <!-- Or, using yarn: -->

   yarn install
   ``

2. Create a .env file in the root of the project directory to store environment variables. Example .env file:

```
PORT=port number
DATABASE_URL=mongodb atlas connection
```

## Running the Application

We can run the application using the following npm scripts:

### **1. Build the application:**

This command compiles the TypeScript files into JavaScript files:

```
npm run build
```

**2. Start the application:**

After building the application, we can start it with the following command:

```
npm run start
```

**3. Start the application in development mode:**

For development, we use the start:dev script, which runs the application using ts-node-dev, so it will automatically reload on file changes:

`npm run start:dev`

**4. Start the application in production mode with nodemon:**

This script uses nodemon to restart the application automatically when changes occur in the compiled JavaScript files:

```
npm run start:prod
```

**5. Linting:**

To run ESLint and check for code issues, use the following command:

`npm run lint`

To automatically fix linting issues, use:

`npm run lint:fix`

**6. Prettier:**
To automatically format your code with Prettier (ignoring .gitignore files), use this command:

````
npm run prettier:fix```


````

"build": "tsc",
"start": "node ./dist/server.js",
"start:prod": "nodemon ./dist/server.js",
"start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
"lint": "npx eslint .",
"lint:fix": "npx eslint . --fix",
"prettier:fix": "prettier --ignore-path .gitignore --write \"\*_/_.+(js|ts|json)\"",

```

```

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
