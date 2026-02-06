# Postman Tests for Users Module

Base URL: `http://localhost:5000/api`

## 1. Create User (Admin) - SUCCESS
- **Method:** `POST`
- **URL:** `{{base_url}}/users`
- **Body:**
  ```json
  {
    "email": "admin@mail.com",
    "password": "strongpassword123",
    "role_id": 1
  }
  ```
  *(Requires Role with ID 1 to exist)*
- **Expected Response:** `201 Created`

## 2. Create User - FAIL (Invalid Role)
- **Method:** `POST`
- **URL:** `{{base_url}}/users`
- **Body:**
  ```json
  {
    "email": "test@mail.com",
    "password": "pass",
    "role_id": 999
  }
  ```
- **Expected Response:** `400 Bad Request`
  ```json
  { "message": "Role with id 999 not found" }
  ```

## 3. Get All Users (Populated)
- **Method:** `GET`
- **URL:** `{{base_url}}/users`
- **Expected Response:** `200 OK`
  ```json
  [
    {
      "id": 1,
      "email": "admin@mail.com",
      "role_id": 1,
      "role": {
        "_id": "...",
        "id": 1,
        "name": "ADMIN",
        "description": "System administrator"
      }
    }
  ]
  ```

## 4. Get User By ID (Populated)
- **Method:** `GET`
- **URL:** `{{base_url}}/users/1`
- **Expected Response:** `200 OK`
  ```json
  {
    "id": 1,
    "role": { "name": "ADMIN", ... },
    ...
  }
  ```
