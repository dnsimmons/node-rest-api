module.exports = {
    "port": 8000,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "secret-phrase",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "PERM_GUEST": 1,
        "PERM_USER": 2,
        "PERM_ADMIN": 9999
    },
    "mongo_str": "mongodb+srv://demo:fcaZ0KwomC7QziZE@cluster0-jmvfx.mongodb.net/node-rest-api?retryWrites=true&w=majority"
};