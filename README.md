# # Framework API NODEJS Oauth2 Develop By Netivit Yuraphan

Please refer this [oauth2-server#3.1.1](https://www.npmjs.com/package/oauth2-server)
[sequelize#6.3.4](https://sequelize.org/master/)
[i18n#0.13.2](https://www.npmjs.com/package/i18n)

Supports `    "oauth2-server": "^3.1.1",`
         `     "i18n": "^0.13.2",`
         `     "mysql2": "^2.1.0",`
         `     "sequelize": "^6.3.4",`
         `     "express": "^4.17.1",`
         `     "dotenv": "^8.2.0",`
         `     "aws-sdk": "^2.892.0",`
         `     "azure-storage": "^2.10.3",`
         `      Docker`
        System Start Expire App in DB expiration_app expiration
    
         
## Quick Start

The module provides two middlewares, one for authorization and routing, another for error handling, use them as you would any other middleware:

Import DB Example in DB/oauth_demo mysql 
Import DB Example in DB/expiration_app mysql 

Edit file .env.development

`npm install`
`npm run start-dev`

## Features

- Supports authorization_code, password, refresh_token, client_credentials and extension (custom) grant types
- Implicitly supports any form of storage e.g. PostgreSQL, MySQL, Mongo, Redis...
- Full test suite

