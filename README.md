## Project Structure

```
.env
tsconfig.jsonFolder PATH listing for volume Software Volume serial number is 0000008E FE89:1AC7
Folder PATH listing for volume Software
Volume serial number is 000000F3 FE89:1AC7
F:\PROJECTS2\MONGOOSE\LEARN-MONGOOSE\ASSIGNMENT2\PRODUCT-ORDER-MANAGEMENT-BACKEND\SRC
|   app.ts
|   server.ts
|
\---app
    +---config
    |       index.ts
    |
    \---modules
        +---order
        |       order.controllers.ts
        |       order.interface.ts
        |       order.model.ts
        |       order.routes.ts
        |       order.services.ts
        |       order.zodValidation.ts
        |
        \---product
                product.controllers.ts
                product.interface.ts
                product.model.ts
                product.routes.ts
                product.services.ts
                product.zodValidation.ts



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
