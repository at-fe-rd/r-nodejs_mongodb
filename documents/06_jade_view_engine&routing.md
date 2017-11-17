# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Jade view engine & Routing

### 1. Jade view engine

​	Nodejs view engine default is Jade. It works like HTML5, but in other syntax, shorter, more clear.

​	The app.js of express will be define it automatically. You will see something like that: 

```
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
```

- They have folder `views` contains all the jade view files. 

- The syntax will be likely that

  ```
  doctype html
    html
      head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
      body
          p Welcome to Jadeview
  ```

- If you want to change the view engine to HTML5:

  You need to install module `ejs` by typing `npm install ejs`, after change the view setup like that:

  ```
  app.set('views', path.join(__dirname, 'views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  ```

- Using jade with nodejs is recommended. However, you also can change to HTML or any view engine you like.

### 2. Routing

Express provides us a folder named `routes`. In this, you can place all you js file to config you routes.

Config the main routes, type it in app.js:

```
var index = require('./routes/index');
app.use('/', index);
```

The main route will be direct to the index.js. Index.js file example: 

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```

The upper code described when you access to localhost:3000/, router.get('/') will be run and render the index jade files. This line `res.render('index', { title: 'Express' });` help us do this.

We also config many sub route files. by adding more in app.js. For ex:

```
var users = require('./routes/users');
app.use('/users', users);
```

This means you will be access the **users.js** in route folder when you link to `localhost:3000/users`

```
//users.js in routes
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

This line `res.send('respond with a resource');` not render any view file, but it will print the `respond with a resource` to the desktop.