# Postman Tests for Roles Module

Base URL: `http://localhost:5000/api`

## 1. Create Role (ADMIN)
- **Method:** `POST`
- **URL:** `{{base_url}}/roles`
- **Headers:** 
    - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "ADMIN",
    "description": "System administrator"
  }
  ```
- **Expected Response:** `201 Created`
  ```json
  {
    "id": 1,
    "name": "ADMIN",
    "description": "System administrator",
    ...
  }
  ```

## 2. Create Role (DOCTOR)
- **Method:** `POST`
- **URL:** `{{base_url}}/roles`
- **Headers:** 
    - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "DOCTOR",
    "description": "Medical Doctor"
  }
  ```
- **Expected Response:** `201 Created`
  ```json
  {
    "id": 2,
    "name": "DOCTOR",
    ...
  }
  ```

## 3. Get All Roles
- **Method:** `GET`
- **URL:** `{{base_url}}/roles`
- **Expected Response:** `200 OK`
  ```json
  [
    { "id": 1, "name": "ADMIN", ... },
    { "id": 2, "name": "DOCTOR", ... }
  ]
  ```

## 4. Get Role By ID
- **Method:** `GET`
- **URL:** `{{base_url}}/roles/1`
- **Expected Response:** `200 OK`
  ```json
  {
    "id": 1,
    "name": "ADMIN",
    ...
  }
  ```

## 5. Update Role
- **Method:** `PUT`
- **URL:** `{{base_url}}/roles/1`
- **Headers:** 
    - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "description": "Updated System Administrator"
  }
  ```
- **Expected Response:** `200 OK`
  ```json
  {
    "id": 1,
    "name": "ADMIN",
    "description": "Updated System Administrator",
    ...
  }
  ```

## 6. Delete Role
- **Method:** `DELETE`
- **URL:** `{{base_url}}/roles/1`
- **Expected Response:** `200 OK`
  ```json
  {
    "message": "Role deleted successfully"
  }
  ```
