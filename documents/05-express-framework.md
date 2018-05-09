# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Express framework

### 1. Introduction

Express is a web app framework for nodejs, it provides for them many strong function in web base. Express is easy to develop the app base on Nodejs. Express support HTTP and middleware to create a strong API and use easily.

When you in the first time to expose to Express, you will be attracted with their api, from using route, template, to work environment.

Some of function of express is:

- Allow setup the middleware to return the HTTP request.
- Define the routing to use with different actions base on http and url.
- Allow return the HTML base on the params to template.

### 2. Install Express Framework

` npm install express`

Their are 3 important modules always go with express:

- body-parser : handle json, raw data, text, encoding URL.
- cookie-parser: Translate header of cookie and send to req.cookies.
- multer: handle multipart/form-data.

### 3. First using with Express:

Helloworld.js

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});
```

Run this code to see how express works.

### 4. Request & Response in Express

Express use a callback function have params is request and response object:

```
app.get('/', function(req,res){
  //
})
```

- Request - as a HTTP request and attributes of request like params,body,http header and other part.
- Response - as a HTTP response when Express receiver a HTTP request.



### 5. Basic Route 

```
var express = require('express');
var app = express();

// Phuong thuc get() phan hoi mot GET Request
app.get('/', function (req, res) {
   console.log("GET Request");
   res.send('Hello GET');
});


// Phuong thuc post() phan hoi mot POST Request
app.post('/', function (req, res) {
   console.log("POST Request");
   res.send('Hello POST');
});

// Phuong thuc delete() phan hoi mot DELETE Request.
app.delete('/delete, function (req, res) {
   console.log("DELETE Request");
   res.send('Hello DELETE');
});


// Phuong thuc nay phan hoi mot GET Request có dạng abcd, abxcd, ab123cd, ...
app.get('/ab*cd', function(req, res) {   
   console.log("GET request /ab*cd");
   res.send('Page Pattern Match');
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port
});
```

### 6. Static File

Express prove extension express.static to serve for static files like images, css,js,… In fact, you just need to pass the name of folder wherer you hold the file, express.statis will use file directly.

Image you have this structure:

```
node_modules
server.js
public/
public/images
public/images/logo.png
```

Using express static:

`app.use(express.static('public'))`

You can access your image in `http:localhost:3000/images/logo.png`
