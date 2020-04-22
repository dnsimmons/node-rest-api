# node-rest-api
An example implementation of a REST API in Node.js with JWT authentication.

## Requirements

## Installation

Clone or download the repo and use npm to install the app.

    $ npm install
    
 Start the app server.
    
    $ node server
    
## Configure

Configuration options for the application can be found in common/config/config.js

    module.exports = {
        "port": 8000,
        "appEndpoint": "http://localhost:8000",
        "apiEndpoint": "http://localhost:8000",
        "jwt_secret": "your-secret-phrase-here",
        "jwt_expiration_in_seconds": 36000,
        "mongo_str": "your-mongodb-connection-string-here"
        ...
    };
    
## Usage
 
 Authorization
 
All resources in this application require a JWT token for authorization.
To login and fetch a valid bearer token perform a POST request to the auth resource with 
a JSON payload containing the email address and password for the user account.
 
    POST http://localhost:8000/auth
    
    {
    	"email": "demo@domain.com",
    	"password": "12345678"
    }   

The application will respond with a JSON payload containing the JWT token for use in subsequent
API calls.

    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
        "refreshToken": "M2NKZ1Uxc0RMTGdyTHdLNDRFNkp..."
    }

Fetch a list of users 

To fetch a list of users from the database perform a GET request to the users resource. 
You can optionally supply a page parameter for pagination in the request body.

    GET http://localhost:8000/users
    
    {
        "page": 1
    }
    
Fetch a user by ID

    GET http://localhost:8000/users/5e9ff682b5985319e4c2ff8e
    
Create a new user

    POST http://localhost:8000/users
    
    {
        firstName:"Example"
        lastName:"User"
        email:"nobody@domain.com"
        password:"secret-password-here"
        permissionLevel: 1
    }