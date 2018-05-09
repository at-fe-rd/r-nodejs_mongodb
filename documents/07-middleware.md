# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Middleware

### 1. Introduction

Middleware is defined as an app have mission to work as **bridge**, provide services from OS to app, help the app can interact with ingredient of OS. 

In website, Middleware is a bridge between users and the kernel of system, mediate role btw request/response and logic handling in web server.

There are 5 types of middleware:

- Application-level middleware 
- Router-level middleware 
- Error-handling middleware 
- Built-in middleware 
- Third-party middleware 

### 2. Application-level middleware

When you create a Web app with ExpressJS, we will have a representative object for Web App. This object will be declare the middleware through `app.use()` or `app.METHOD`

- This below code describes a function without specific URL, so they will be run each time of request:

```

var app = express()
 
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

- This below code use the `use function` to `/user/:id`. The function will be run each request to the URL: ` /user/:id`  with all function.

  ```
  app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })
  ```

- When you want to call a list of middleware for specific URL, we can do the below example:

  ```

  app.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })
  ```

- When you want to skip the next middleware, we will use `next('route')`, however this work just work with middleware loaded through `app.METHOD` or `router.METHOD`

- This example describe middleware function will stop immediately when id=0:

```

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})
 
// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special')
})
```

### 3. Router-level middleware

ExpressJS provide a router object to declare route by ` var router = express.Router()`

This code below describe a way to use router to setup the route needs for resource **user**:

```
var app = express()
var router = express.Router()
 
// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
 
// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
 
// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})
 
// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})
 
// mount the router on the app
app.use('/', router)
```

### 4. Error-handline middleware

This is the middleware serve for error handling. Notice that the function for this will receive 4 params(err,req,res,next).

When you want to declare a middleware for fix bug, you need to create a function have 4 params. Although you may not use the `next object`, but the function also need format with 4 params. If not, ExpressJs cannot declare that is function of fixing bug, and will not run when an error occurs, just work like another middleware.

```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

### 5. Built-in middleware

The last built-in middleware still exist in ExpressJS is express.static, base on the library `serve-static`, use to prive the static content in website, such as html, image,css,js,….

```
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
 
app.use(express.static('public', options))
```

In other way, you can declare many static folders in 1 web, this code will create 3 static folder: 

```
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('files'))
```

### 6. Third-party middleware

Use third-party will help us have more functio for web app. 

We have to install module through npm , after that declare it in app object if using in Application-level, or through router object if use in Router-level.

```
$ npm install cookie-parser
​``````
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
 
// load the cookie-parsing middleware
app.use(cookieParser())
```

| Middleware module                        | Description                              | Replaces built-in function (Express 3) |
| ---------------------------------------- | ---------------------------------------- | -------------------------------------- |
| [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html) | Parse HTTP request body. See also: [body](https://github.com/raynos/body), [co-body](https://github.com/visionmedia/co-body), and [raw-body](https://github.com/stream-utils/raw-body). | express.bodyParser                     |
| [compression](http://expressjs.com/en/resources/middleware/compression.html) | Compress HTTP responses.                 | express.compress                       |
| [connect-rid](http://expressjs.com/en/resources/middleware/connect-rid.html) | Generate unique request ID.              | NA                                     |
| [cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html) | Parse cookie header and populate `req.cookies`. See also [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip). | express.cookieParser                   |
| [cookie-session](http://expressjs.com/en/resources/middleware/cookie-session.html) | Establish cookie-based sessions.         | express.cookieSession                  |
| [cors](http://expressjs.com/en/resources/middleware/cors.html) | Enable cross-origin resource sharing (CORS) with various options. | NA                                     |
| [csurf](http://expressjs.com/en/resources/middleware/csurf.html) | Protect from CSRF exploits.              | express.csrf                           |
| [errorhandler](http://expressjs.com/en/resources/middleware/errorhandler.html) | Development error-handling/debugging.    | express.errorHandler                   |
| [method-override](http://expressjs.com/en/resources/middleware/method-override.html) | Override HTTP methods using header.      | express.methodOverride                 |
| [morgan](http://expressjs.com/en/resources/middleware/morgan.html) | HTTP request logger.                     | express.logger                         |
| [multer](http://expressjs.com/en/resources/middleware/multer.html) | Handle multi-part form data.             | express.bodyParser                     |
| [response-time](http://expressjs.com/en/resources/middleware/response-time.html) | Record HTTP response time.               | express.responseTime                   |
| [serve-favicon](http://expressjs.com/en/resources/middleware/serve-favicon.html) | Serve a favicon.                         | express.favicon                        |
| [serve-index](http://expressjs.com/en/resources/middleware/serve-index.html) | Serve directory listing for a given path. | express.directory                      |
| [serve-static](http://expressjs.com/en/resources/middleware/serve-static.html) | Serve static files.                      | express.static                         |
| [session](http://expressjs.com/en/resources/middleware/session.html) | Establish server-based sessions (development only). | express.session                        |
| [timeout](http://expressjs.com/en/resources/middleware/timeout.html) | Set a timeout period for HTTP request processing. | express.timeout                        |
| [vhost](http://expressjs.com/en/resources/middleware/vhost.html) | Create virtual domains.                  | express.vhost                          |
