# node-rest-api

An example companies and contacts REST API written in Node.JS with JWT authentication serving 
documents from a MongoDB database.

## Requirements

- Node.JS
- MongoDB

## Installation

Use npm to install the applications dependencies.

    $ npm install
    
    
## Configuration

In the applications root rename the provided .env.example 
to .env and edit accordingly providing a server port, MongoDB 
connection string, and JWT secret.

    SERVER_PORT=8000
    DB_CONNECTION="your-connection-string-goes-here"
    JWT_SECRET="your-secret-goes-here"
    
### Database

The application expects that 3 collections exist in the 
configured MongoDB database: users, companies, and contacts.

Need a free MongoDB database? Try https://www.mongodb.com/cloud/atlas

### Seeding

Add the user document provided below to the users collection. 
This will enable you to authenticate with a password of "12345678" for testing.

    {
        "name" : "Example User",
        "email" : "example@localhost"
        "password" : "BHq8FHt4TBm6sxgp/GSNIA==$wP4uKt1jab7YHUZlMa2zl/GWtoP1xtrzkjGG2jw+fInZskOyeHO3EGXQanD9VLeejt/YZHCo2VQ1majz1ezQKQ=="
    }
  
## Usage

Start the application server.

    $ npm start
    
 ### Authorization
 
 Authenticate and fetch a bearer token.
 
    POST http://localhost:8000/authorize
    
    {
        "email" : "example@localhost",
        "password" : "12345678"
    }
 
 ### Companies
 
 Fetch a collection of company documents.
 
    GET http://localhost:8000/companies    
    
 Fetch a company document by ID.
 
    GET http://localhost:8000/companies/<company-id>   
    
 Store a company document in the database. 
 
    POST http://localhost:8000/companies
    
    {
        name: "ACME Company",
        industry: "Manufacturing"
    }

 Update a company document in the database by ID. 
 
    PATCH http://localhost:8000/companies/<company-id> 
    
    {
        name: "XYZ Company",
        industry: "Manufacturing"
    }
    
  Delete a company document from the database by ID. 
  
     DELETE http://localhost:8000/companies/<company-id> 
     
### Contacts
      
  Fetch a collection of contact documents.
  
     GET http://localhost:8000/companies    
     
  Fetch a contact document by ID.
  
     GET http://localhost:8000/companies/<company-id>   
     
  Store a contact document in the database. 
  
     POST http://localhost:8000/companies
     
     {
         name: "Wiley Cyote",
         email: "nodody@localhost",
         phone: "555-555-5555"
     }
 
  Update a contact document in the database by ID. 
  
     PATCH http://localhost:8000/companies/<company-id> 
     
     {
         name: "Road Runner",
         email: "nodody@localhost",
         phone: "555-555-5555"
     }
     
   Delete a contact document from the database by ID. 
   
      DELETE http://localhost:8000/companies/<company-id> 
