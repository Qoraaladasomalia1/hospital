# Postman Test Collection

This document outlines the API endpoints for Departments, Doctors, Patients, Doctor Availability, and Appointments. You can import these as manual requests in Postman.

## **Prerequisites**
Before running these tests, ensure you have:
1.  Running the Node.js server (`npm start` or `node server.js`).
2.  **Users** created in the system (needed for `user_id` fields).
3.  **Roles** created (if required by your User creation flow).

---

## 1. Departments

### 1.1 Create Department
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/departments`
- **Body (JSON):**
  ```json
  {
    "name": "Cardiology"
  }
  ```
- **Expected Status:** `201 Created`

### 1.2 Get All Departments
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/departments`
- **Expected Status:** `200 OK`

### 1.3 Get Department by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/departments/1`
- **Expected Status:** `200 OK`

### 1.4 Update Department
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/departments/1`
- **Body (JSON):**
  ```json
  {
    "name": "Advanced Cardiology"
  }
  ```
- **Expected Status:** `200 OK`

### 1.5 Delete Department
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/departments/1`
- **Expected Status:** `200 OK`

---

## 2. Doctors

*Note: Requires a valid `user_id` (User) and `department_id` (Department).*

### 2.1 Create Doctor
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/doctors`
- **Body (JSON):**
  ```json
  {
    "user_id": 2,
    "department_id": 1,
    "full_name": "Dr. Ahmed Ali",
    "specialization": "Heart Specialist",
    "consultation_fee": 25.00
  }
  ```
- **Expected Status:** `201 Created`

### 2.2 Get All Doctors
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/doctors`
- **Expected Status:** `200 OK`

### 2.3 Get Doctor by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/doctors/1`
- **Expected Status:** `200 OK`

### 2.4 Update Doctor
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/doctors/1`
- **Body (JSON):**
  ```json
  {
    "consultation_fee": 30.00
  }
  ```
- **Expected Status:** `200 OK`

### 2.5 Delete Doctor
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/doctors/1`
- **Expected Status:** `200 OK`

---

## 3. Patients

*Note: Requires a valid `user_id` (User).*

### 3.1 Create Patient
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/patients`
- **Body (JSON):**
  ```json
  {
    "user_id": 3,
    "full_name": "Hassan Mohamed",
    "phone": "+25261xxxxxx",
    "gender": "Male",
    "age": 30
  }
  ```
- **Expected Status:** `201 Created`

### 3.2 Get All Patients
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/patients`
- **Expected Status:** `200 OK`

### 3.3 Get Patient by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/patients/1`
- **Expected Status:** `200 OK`

### 3.4 Update Patient
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/patients/1`
- **Body (JSON):**
  ```json
  {
    "phone": "+25261999999"
  }
  ```
- **Expected Status:** `200 OK`

### 3.5 Delete Patient
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/patients/1`
- **Expected Status:** `200 OK`

---

## 4. Doctor Availability

*Note: Requires a valid `doctor_id` (Doctor).*

### 4.1 Create Availability
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/doctor-availability`
- **Body (JSON):**
  ```json
  {
    "doctor_id": 1,
    "day_of_week": "Monday",
    "start_time": "09:00",
    "end_time": "13:00"
  }
  ```
- **Expected Status:** `201 Created`

### 4.2 Get All Availabilities
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/doctor-availability`
- **Expected Status:** `200 OK`

### 4.3 Get Availability by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/doctor-availability/1`
- **Expected Status:** `200 OK`

### 4.4 Get Availability by Doctor ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/doctor-availability/doctor/1`
- **Expected Status:** `200 OK`

### 4.5 Update Availability
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/doctor-availability/1`
- **Body (JSON):**
  ```json
  {
    "end_time": "14:00"
  }
  ```
- **Expected Status:** `200 OK`

### 4.6 Delete Availability
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/doctor-availability/1`
- **Expected Status:** `200 OK`

---

## 5. Appointments

*Note: Requires a valid `patient_id` (Patient) and `doctor_id` (Doctor).*

### 5.1 Create Appointment
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/appointments`
- **Body (JSON):**
  ```json
  {
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2026-02-10",
    "appointment_time": "10:30"
  }
  ```
- **Expected Status:** `201 Created`

### 5.2 Get All Appointments
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/appointments`
- **Expected Status:** `200 OK`

### 5.3 Get Appointment by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/appointments/1`
- **Expected Status:** `200 OK`

### 5.4 Get Appointments by Doctor
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/appointments/doctor/1`
- **Expected Status:** `200 OK`

### 5.5 Get Appointments by Patient
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/appointments/patient/1`
- **Expected Status:** `200 OK`

### 5.6 Update Appointment (e.g., Confirm)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/appointments/1`
- **Body (JSON):**
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
- **Expected Status:** `200 OK`

### 5.7 Delete Appointment
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/appointments/1`
- **Expected Status:** `200 OK`
