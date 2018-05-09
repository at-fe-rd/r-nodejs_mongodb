# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Mongo Database

Basic about mongo Database

### 1. Introduction

install it by : `npm install mongodb`

Node.js can use this module to manipulate MongoDB databases:

`var mongo = require('mongodb');`

In this chapter, we still not mention nodejs very much. We will focus on MongoDB, help you know the functions to work with it.

After you install successful, open Terminal and type `mongo`. It will help you access with mongoDB with your command line.

- command: `db` the result will be `test`

- command: `show dbs` the os will print all mongo db have.

- command: `use newdatabase` mongo will switched to db named `newdatabase` . Now, we can CRUD, query all we want in `newdatabase` database

- first, create collections named `users` by  `db.createCollection('users')`.

- to see all collections we have in this db: `show collections`

- to add user in User Collection by `db.users.insert({name: 'Quan', company: 'Tech'})`

- list all users in User Collection by `db.users.find()`, and see the result more pretty with `db.users.find().pretty()`

- Update users by find the user have name 'Quan' and change the company

  ```
  db.users.update(
  {name: 'Quan'},
  {
  	$set: {
    		company: AsianTech
  	}
  })
  ```

- Remove all users: ` db.users.remove({})`

See more functions in here https://docs.mongodb.com/manual/reference/method/

### 2. Config Mongo with Nodejs

We need to install `mongo` module and require it in Nodejs.

In order to work with mongodb easily, I recommend you install and require one more module named `mongoose`

- Create a `models` folder which contains all information about your database.

- Create a js file named `users`

- Require `mongoose` and connect our nodejs app to mongodb by 

  `mongoose.connect('mongodb://localhost/nodeauth');` It will connect to the database named `nodeauth`

- Create a variable name `db` represents for mongoose connection. `var db = mongoose.connection;`

- Mongoose help us work with Schema very easily. We have a schema like that:

  ```
  //User schema
  var UserSchema = mongoose.Schema({
    username: {
      type: String,
      index: true
    },
    password: {
      type: String
    },
    email: {
      type: String
    },
    name: {
      type: String
    },
    profileimage: {
      type: String
    }
  });
  ```

- Export this file : `var User = module.exports = mongoose.model('User', UserSchema);` .
