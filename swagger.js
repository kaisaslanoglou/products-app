const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "components": {
        "schemas": {
        User: m2s(User),
        Product: m2s(Product)
}
},
"openapi":"3.1.0",
"info":{
    "version":"1.0.0",
    "title":"Products CRUD API",
    "description":"Products project application",
    "contact": {
        "name":"SPI Support",
        "url":"http//www.example.com",
        "email":"support@example.com"
    }
},
"servers":[
    {
        url:"http://localhost:3003",
        description: "Local Server"
    },
    {
        url:"http://www.example.com",
        description: "Testing Server"
    }
],
"tags": [ 
{
    "name":"Users",
    "description":"API endpoints for users"
},
{
    "name":"Products",
    "description":"API endpoints for products"
},
{
    "name":"Users and Products",
    "description":"API endpoints for users and products"
}
],
"paths": {
    "/api/users":{
        "get":{
            "tags":["Users"],
            "description":"Return all users",
            "responses":{
                "200": {
                    "description": "A list of users",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"array",
                                "items":{
                                    "$ref":"#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
            "post": {
                "tags":["Users"],
                "description":"Create new user",
                "requestBody":{
                    "description":"User schema to insert",
                "content":{
                    "application/json":{
                        "schema":{
                            "type":"object",
                            "properties":{
                                "username": {"type":"string"},
                                "password": {"type":"string"},
                                "name": {"type":"string"},
                                "surname": {"type":"string"},
                                "email": {"type":"string"},
                                "address": {
                                    "type": "object",
                                    "properties":{
                                        "area": {"type":"string"},
                                        "road": {"type":"string"}
                                    }
                                },
                                "phone":{
                                    "type":"array",
                                    "items":{
                                        "type":"object",
                                        "properties": {
                                            "type": {"type":"string"},
                                            "number": {"type":"string"}
                                        }
                                    }
                                }
                            },
                            "required":["username", "password", "email"]
                        }
                    }
                }
            },
            "responses":{
                "200":{
                    "description":"New user inserted"
                }
            }
        }
    },
    "/api/users/{username}":{
        "get":{
            "tags":["Users"],
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user that we want to find",
                    "type":"string"
                }
            ],
            "description":"Get User with specific username",
            "responses":{
                "200":{
                    "descrption":"User to find",
                    "schema":{
                        "$ref":"#/components/schemas/User"
                    }
                }
            }
        },
        "patch":{
            "tags":["Users"],
            "description":"Update User in app",
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user that we want to find",
                    "type":"string"
                }
            ],
            "requestBody": {
                "description":"User that we update",
                "content":{
                "application/json":{
                    "schema":{
                        "type":"object",
                        "properties":{
                            "username": {"type":"string"},
                            "password": {"type":"string"},
                            "name": {"type":"string"},
                            "surname": {"type":"string"},
                            "email": {"type":"string"},
                            "address": {
                                "type": "object",
                                "properties":{
                                    "area": {"type":"string"},
                                    "road": {"type":"string"}
                                }
                            },
                            "phone":{
                                "type":"array",
                                "items":{
                                    "type":"object",
                                    "properties": {
                                        "type": {"type":"string"},
                                        "number": {"type":"string"}
                                    }
                                }
                            }
                        },
                        "required":["email"]
                    }
                }
            }
        },
        "responses":{
            "200": {
                "description":"Update user",
                "schema":{
                    "$ref": "#/components/schemas/User"
            }
        }
    }
},
    "delete":{
        "tags":["Users"],
        "description":"Delete a user",
        "parameters":[
            {
                "name":"username",
                "in":"path",
                "required":true,
                "description":"Username of user that we want to find",
                "type":"string"
            }
        ],
        "responses":{
            "200": {
                "description":"Delete user",
                "schema":{
                    "$ref": "#/components/schemas/User"
            }
        }
    }
}
    ,






    "/api/products":{
        "get":{
            "tags":["Products"],
            "description":"Return all products",
            "responses":{
                "200": {
                    "description": "A list of products",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"array",
                                "items":{
                                    "$ref":"#/components/schemas/Product"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/products/{id}":{
        "get":{
            "tags":["Products"],
            "parameters":[
                {
                    "name":"id",
                    "in":"path",
                    "required":true,
                    "description":"id of product that we want to find",
                    "type":"string"
                }
            ],
            "description":"Get Product with specific id",
            "responses":{
                "200":{
                    "descrption":"Product to find",
                    "schema":{
                        "$ref":"#/components/schemas/Product"
                    }
                }
            }
        }
    },
    "/api/user-products":{
        "get":{
            "tags":["Users and Products"],
            "description":"Return all users' products",
            "responses":{
                "200": {
                    "description": "A list of all users' products",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"array",
                                "items":{
                                    "$ref":"#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/user-products/{username}":{
        "get":{
            "tags":["Users and Products"],
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"username of the user whose products we want to find",
                    "type":"string"
                }
            ],
            "description":"Return a user's products",
            "responses":{
                "200": {
                    "description": "A user's products",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"array",
                                "items":{
                                    "$ref":"#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
    }
    }
