# productReview

The Product Reviews API allows users to consult and share their opinions about different products. Users can post reviews, rate them on a scale of 1 to 5 stars, and read other users' opinions. The API allows you to manage a list of products, display all reviews for a specific product, and calculate an average rating to help users make informed purchasing decisions.

The application is developed with MVC architecture and uses Express.js, MongoDB and Node.js . For authentication, JWT and Passport.js are used to manage secure access.

To install and configure this project, follow these steps:

### **Prerequisites**:

- **Node.js**: Make sure you have Node.js version `18.x` installed.
- **NPM**: Comes installed with Node.js, but make sure you have a recent version.

### Installing dependencies

- Clone the project repository and navigate to the project directory.

  ```bash
  git clone https://github.com/Juannnrv/productReview.git

  cd productReview
  ```

- Run the following command to install the production and development dependencies:

  ```bash
  npm install
  ```

### Set enviroment variables:

Create an `.env` file in the root of the project and add the necessary environment variables (follow .envTemplate file).

```bash

    MONGO_PROTOCOLO=mongodb+srv://
    MONGO_USER=juannnrv
    MONGO_PSW=Jd1512.2006
    MONGO_DB_NAME=productReview
    MONGO_HOST=cluster0.zow9a.mongodb.net
    JWT_SECRET=37ef15b4927b9b7aeeccccf335079d9aa0aa0367c3c74ed0f2de6561cd94d687

```

### **Start the project**:

- In development, you can use the following command to start backend:

  ```bash
  npm run start
  ```

This will start backend server (`server.js`) with environment variables defined in `.env`.

## Issue

In online commerce, it is common for consumers to seek reviews from other users before deciding to buy a product. However, often the information available is limited, difficult to access or unreliable, which affects the shopping experience and customer satisfaction. In addition, for many sites, review management is limited: they do not allow to organize or filter reviews efficiently, which causes frustration and distrust among users.

## Objectives of the API

The Product Reviews API addresses this issue by enabling users to:

**View detailed reviews:** easily access opinions about the products they wish to purchase.
**Rate products:** Record and view average ratings to get an idea of the quality of each product.
**Share their experiences:** Users can leave feedback to help other consumers and contribute to product reputation.

## Key API Features.

**Product Management:** Product registration with details such as name, description and category.
**Review System:** Registration of reviews with comments, 1 to 5 star ratings, and storage of review date.
**Rating Average:** Calculation and display of the average rating for each product for quick reference.
**Filtering and Sorting:** Ability to sort reviews by rating (from highest to lowest) and to view only the most recent reviews or those of a specific rating.

# Auth API documentation

## Create Account

**Method**: `POST`

**URL**: `http://localhost:5000/auth/create`

**Auth required**: `False`

**Limit requests**: 45 every 15 minutes

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Body:

```
{
    "username": "string",
    "email": "valid email",
    "password": "string, minimum 6 characters",
}
```

#### Success Response:

- **Code**: `201 Created`

```
{
    "status": 201,
    "message": "User account created successfully",
    "data": {
        "username": "sampleUsername",
        "email": "sampleEmail",
        "password": "hashedPassword"
    }
}
```

#### Error Responses

**Code**: `400 Bad Request`

```
{
    "status": 400,
    "message": "Validation errors",
    "data": [
        {
            "msg": "Username is required",
            "param": "username",
            "location": "body"
        }
    ]
}
```

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error creating user account",
    "error": "Error message"
}
```

---

### Log In

**Method**: `POST`

**URL**: `http://localhost:5000/auth/login`

**Auth required**: `False`

**Limit requests**: 3 every 3 minutes

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Body:

```
{
    "username": "string, optional",
    "email": "valid email, optional"
    "password": "string"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User logged in successfully",
    "data": {
        "username": "sampleUsername",
        "email": "sampleEmail",
        "password": "hashedPassword"
    }
}
```

#### Error Responses

**Code**: `400 Bad Request`

```
{
    "status": 400,
    "message": "Invalid password, please check and try again"
}
```

**Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error logging in user",
    "error": "Error message"
}
```

---

## Product API Documentation

### Create Product

**Method**: `POST`

**URL**: `http://localhost:5000/product`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Body:

```
{
  "name": "string, required",
  "description": "string, required",
  "category": "string, required"
}
```

#### Success Response:

- **Code**: `201 Created`

```
{
  "status": 201,
  "message": "Product created",
  "data": {
    "name": "Product Name",
    "description": "Product Description",
    "category": "Product Category",
    "_id": "productId"
  }
}
```

#### Error Responses:

**Code**: `400 Bad Request`

```
{
  "status": 400,
  "message": "Validation errors",
  "data": [
    {
      "msg": "Product name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Product description is required",
      "param": "description",
      "location": "body"
    },
    {
      "msg": "Product category is required",
      "param": "category",
      "location": "body"
    }
  ]
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error creating product",
  "error": "Error message"
}
```

---

### Get All Products

**Method**: `GET`

**URL**: `http://localhost:5000/product`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Products found",
  "data": [
    {
      "_id": "productId1",
      "name": "Product Name 1",
      "description": "Description of Product 1",
      "category": "Category1"
      "reviews": [ ... ]  // Array of reviews objectsId
    },
    {
      "_id": "productId2",
      "name": "Product Name 2",
      "description": "Description of Product 2",
      "category": "Category2"
      "reviews": [ ... ]  // Array of reviews objectsId
    }
  ]
}
```

#### Error Response:

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "No products found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error getting products",
  "error": "Error message"
}
```

---

### Get Product By ID

**Method**: `GET`

**URL**: `http://localhost:5000/product/:id`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Product found",
  "data": {
    "_id": "productId",
    "name": "Product Name",
    "description": "Product Description",
    "category": "Product Category"
    "reviews": [ ... ]  // Array of reviews objectsId
  }
}
```

#### Error Responses:

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "Product not found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error getting product",
  "error": "Error message"
}
```

---

### Update Product

**Method**: `PUT`

**URL**: `http://localhost:5000/product/:id`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Body:

```
{
  "name": "string, optional",
  "description": "string, optional",
  "category": "string, optional"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Product updated",
  "data": {
    "_id": "productId",
    "name": "Updated Product Name",
    "description": "Updated Description",
    "category": "Updated Category"
    "reviews": [ ... ]  // Array of reviews objectsId
  }
}
```

#### Error Responses:

**Code**: `400 Bad Request` (validación fallida)

```
{
  "status": 400,
  "message": "Validation errors",
  "data": [
    {
      "msg": "Product name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "Product not found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error updating product",
  "error": "Error message"
}
```

---

### Delete Product

**Method**: `DELETE`

**URL**: `http://localhost:5000/product/:id`

**Auth required**: `True`

**Limit requests**: 10 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Product deleted"
}
```

#### Error Responses:

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "Product not found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error deleting product",
  "error": "Error message"
}
```

---

### Get Product Average Rating

**Method**: `GET`

**URL**: `http://localhost:5000/product/average/:productId`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Average rating",
  "data": 4.5
}
```

#### Error Responses:

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "Product not found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error getting average rating",
  "error": "Error message"
}
```

---

### Search Product 

**Method**: `GET`

**URL**: `http://localhost:5000/product/average/:productId`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Query Parameters:

```
{
  query (string, required): The search term for the product name or description.
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
  "status": 200,
  "message": "Products found",
  "data": [
    {
      "_id": "productId1",
      "name": "Product Name 1",
      "description": "Product Description 1"
    },
    {
      "_id": "productId2",
      "name": "Product Name 2",
      "description": "Product Description 2"
    }
    // More products
  ]
}
```

#### Error Responses:

**Code**: `400 Bad Request`

```
{
  "status": 400,
  "message": "Query parameter is required"
}
```

**Code**: `404 Not Found`

```
{
  "status": 404,
  "message": "No products found"
}
```

**Code**: `500 Internal Server Error`

```
{
  "status": 500,
  "message": "Error searching products",
  "error": "Error message"
}
```

---

## Reviews API Documentation

### **Get Reviews**

**Method**: GET

**URL**: `http://localhost:5000/review`

**Auth required**: True

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Reviews found",
  "data": [
    {
      "_id": "reviewId1",
      "productId": "productId1",
      "rating": 5,
      "comment": "Great product!",
      "date": "2024-11-19T12:34:56Z"
    },
    ...
  ]
}
```

#### Error Responses:

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "No reviews found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error getting reviews",
  "error": "Error message"
}
```

---

### **Get Review by ID**

**Method**: GET

**URL**: `http://localhost:5000/review/:id`

**Auth required**: True

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Review found",
  "data": {
    "_id": "reviewId1",
    "productId": "productId1",
    "rating": 5,
    "comment": "Great product!",
    "date": "2024-11-19T12:34:56Z"
  }
}
```

#### Error Responses:

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "Review not found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error getting review",
  "error": "Error message"
}
```

---

### **Create Review**

**Method**: POST

**URL**: `http://localhost:5000/review`

**Auth required**: True

**Limit requests**: 45 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Body:

```
{
  "productId": "ObjectId",
  "rating": 4,
  "comment": "This product is good."
}
```

#### Success Response:

- **Code**: 201 Created

```
{
  "status": 201,
  "message": "Review created",
  "data": {
    "_id": "reviewId1",
    "productId": "productId1",
    "rating": 4,
    "comment": "This product is good.",
    "date": "2024-11-19T12:34:56Z"
  }
}
```

#### Error Responses:

**Code**: 400 Bad Request

```
{
  "status": 400,
  "message": "Validation errors",
  "data": [
    {
      "msg": "Rating is required",
      "param": "rating"
    },
    {
      "msg": "Comment is required",
      "param": "comment"
    }
  ]
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error creating review",
  "error": "Error message"
}
```

---

### **Update Review**

**Method**: PUT

**URL**: `http://localhost:5000/review/:id`

**Auth required**: True

**Limit requests**: 45 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Body:

```
{
  "rating": 5,
  "comment": "Updated review: Great product!"
}
```

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Review updated",
  "data": {
    "_id": "reviewId1",
    "productId": "productId1",
    "rating": 5,
    "comment": "Updated review: Great product!",
    "date": "2024-11-19T12:34:56Z"
  }
}
```

#### Error Responses:

**Code**: 400 Bad Request

```
{
  "status": 400,
  "message": "Validation errors",
  "data": [
    {
      "msg": "Rating is required",
      "param": "rating"
    },
    {
      "msg": "Comment is required",
      "param": "comment"
    }
  ]
}
```

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "Review not found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error updating review",
  "error": "Error message"
}
```

---

### **Delete Review**

**Method**: DELETE

**URL**: `http://localhost:5000/review/:id`

**Auth required**: True

**Limit requests**: 10 every 10 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Review deleted"
}
```

#### Error Responses:

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "Review not found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error deleting review",
  "error": "Error message"
}
```

---

### **Get Sorted Reviews**

**Method**: GET

**URL**: `http://localhost:5000/review/sorted`

**Auth required**: True

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Query Parameters:

- `sortBy`: (string) Required. Options are `rating` or `date`.

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Reviews found",
  "data": [
    {
      "_id": "reviewId1",
      "productId": "productId1",
      "rating": 5,
      "comment": "Great product!",
      "date": "2024-11-19T12:34:56Z"
    },
    ...
  ]
}
```

#### Error Responses:

**Code**: 400 Bad Request

```
{
  "status": 400,
  "message": "Invalid sortBy parameter"
}
```

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "No reviews found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error getting reviews",
  "error": "Error message"
}
```

---

### **Get Reviews by Specific Rating**

**Method**: GET

**URL**: `http://localhost:5000/review/rating/:rating`

**Auth required**: True

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: 200 OK

```
{
  "status": 200,
  "message": "Reviews found",
  "data": [
    {
      "_id": "reviewId1",
      "productId": "productId1",
      "rating": 5,
      "comment": "Great product!",
      "date": "2024-11-19T12:34:56Z"
    },
    ...
  ]
}
```

#### Error Responses:

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "No reviews found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error getting reviews",
  "error": "Error message"
}
```

---

### **Get top rated products**

**Method**: GET

**URL**: `http://localhost:5000/review/average`

**Auth required**: True

**Limit requests**: 25 every 15 minutes

#### Headers:

```
{
  "Content-Type": "application/json",
  "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: 200 OK

```
  {
  "status": 200,
  "message": "Top rated products found",
  "data": [
    {
      "_id": "productId1",
      "name": "Product Name 1",
      "averageRating": 4.8
    },
    {
      "_id": "productId2",
      "name": "Product Name 2",
      "averageRating": 4.7
    },
    ...
  ]
  }
```

#### Error Responses:

**Code**: 404 Not Found

```
{
  "status": 404,
  "message": "No products found"
}
```

**Code**: 500 Internal Server Error

```
{
  "status": 500,
  "message": "Error getting top rated products",
  "error": "Error message"
}
```
