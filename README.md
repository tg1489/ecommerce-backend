[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# eCommerce Backend

## Table of Contents

 • [Description](#description)

 • [Installation](#installation)

 • [Usage](#usage)

 • [API Endpoints](#api-endpoints)

 • [Data Structure](#data-structure)

 • [Technologies Used](#technologies-used)

 • [Contributing](#contributing)

 • [Questions](#questions)

 • [License](#license)

## Description

This project is a RESTful API for managing products. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products and their associated categories and tags.

## Installation

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd <project-directory>
Install dependencies: npm install

## Usage

Start the server: npm start
Access the API endpoints through a tool like Insomnia or Postman.
Perform CRUD operations on products, categories, and tags.

## API Endpoints

- GET /api/products: Retrieves all products.
- GET /api/products/:id: Retrieves a specific product by ID.
- POST /api/products: Creates a new product.
- PUT /api/products/:id: Updates an existing product.
- DELETE /api/products/:id: Deletes a product by ID.

## Data Structure

The API uses the following data structure:

- Product:
  - id (integer): The unique identifier of the product.
  - product_name (string): The name of the product.
  - price (decimal): The price of the product.
  - stock (integer): The stock quantity of the product.
  - category (object): The category associated with the product.
  - tags (array): The tags associated with the product.

- Category:

  - id (integer): The unique identifier of the category.
  - category_name (string): The name of the category.

- Tag:

  - id (integer): The unique identifier of the tag.
  - tag_name (string): The name of the tag.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## Questions

If you have any questions about this program or would like to report a bug, please contact the author through GitHub:
[GitHub](https://github.com/tg1489/)
Alternatively, you may reach out and email me down below if you have any additional questions about the program.
[Email](mailto:tonyguarino1489@gmail.com)

## License

This application is licensed under the MIT License. See the LICENSE file for more information.
