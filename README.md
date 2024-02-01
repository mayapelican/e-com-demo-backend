
# E-commerce Backend Demo 

This is a simple e-commerce application backend

### Functions
1. Role based authentication
2. Shopping preferences handing ( Customer related functions only)


## 1. Getting Started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM
- A database such as MySQL.

### 1.2 Project Configuration

Update .env file to your project configuration(Eg: .env.example)

### 1.3 Launch and Discover

1. Run `yarn` command to install the npm packages
2. Run `yarn dev` to start  the application in development mode

### 1.4 Swagger Documentation

After running the application, use following link to access the swagger documentation, 

http://localhost:3001/api/

Also, you can find the postman collection in the project root. 

Postman file: ECommerceDemoBackend.postman_collection.json

## 2. Health-check Support

Health check endpoint: /health

## 3. TODO

1. Need to send a email with the generated OTP
2. Need to implement a new api endpoint and function to re-request the OTP
3. Test cases