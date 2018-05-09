# NODE.JS Document

@(FE)[Nodejs | Oct 30th 2017 | Asian Tech ]

------

[TOC]

------

## Some popular module in Nodejs

### 1. Node-persist - Local Storage in Server

To temporary storing data:

- In Javascript HTML5 have LocalStorage and SessionStorage.
- So in Nodejs we use module **node-persist** to storage data temporarily in Server.



#### 1.1 Node-persist?

is a module similar to Localstorage in HTML5. It save data in a file in system or in memory with content is JSON, instead of saving in database.

#### 1.2 Node-persist Setup and Using

```
npm install node-persist@0.0.8 --save
```

Using:

— Declaring:

```
var storage = require('node-persist');
```

— Init function:

```
storage.initSync();
or
storage.init().then(promise);
```

**Note:**

------

 	The function have `sync` is sync and async in vice versa

​	When to init by init(), all functions have to using as async, and vice versa. It means you init function in which mode, all the remaining have to be in the same mode.

​	If you setup in Sync the data will save in disk, so you can use for the next request.

​	It you setup in Async, the data will only live in that request.

------



— Init functions will create a parameter Object. in which there are keys and you have to notice 2 keys:

```
storage.init({
    dir : "path/to/save",
    ttl : false
});
 
storage.initSync({
    dir : "path/to/save",
    ttl : false
});
```

​	In which key `dir` is the path to save data. If you do not config, it will save automatically in the following path: 

`node-modules/node-persist/storage/persist`

​	Key `ttl` the the lifetime of data, if you config `false` the data will live forever.

— Get function:

Get functions will use to get value of some key, if key is not exist it will return `underfined`

```
storage.getItem('domain');
// hoặc
storage.getItemSync('domain');
```

— Set function:

Set function will config the value for some key.

```
storage.setItem('domain', 'freetuts');
// hoặc
storage.setItemSync('domain', 'freetuts');
```

— Remove function

To remove some key.

```
storage.removeItem('domain');
// hoặc
storage.removeItemSync('domain');
```

— clear function

To clear all key in memory and disk

```
storage.clear();
// hoặc
storage.clearSync();
```

### 2. HTTP Module

Nodejs has a built-in module called HTTP, which allows Nodejs to transfer data over the HTTP.

To include the HTTP module: ` var http = require('http')`

#### 2.1 Nodejs as a Web Server

The Http module can create an HTTP server that listens to server ports and gives a response back to the client.

Use the `createServer()` method to create an HTTP server:

```
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
```

The function passed into the `http.createServer()` method, will be executed when someone tries to access the computer on port 8080.

#### 2.2 Add an HTTP header

`res.writeHead(200, {'Content-Type': 'text/html'});**`

The first argument of the `res.writeHead()` method is the status code, 200 means that all is OK, the second argument is an object containing the response headers.

#### 2.3 Read the query String

The function passed into the `http.createServer()` has a `req` argument that represents the request from the client, as an object (http.IncomingMessage object).

This object has a property called "url" which holds the part of the url that comes after the domain name.

###3. URL Module

There are built-in modules to easily split the query string into readable parts, such as the URL module.

`var url = require('url');`

```
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
```

### 4. File System Module

The Node.js file system module allow you to work with the file system on your computer.

Common use for the File System module:

- Read files
- Create files
- Update files
- Delete files
- Rename files

```
var fs = require('fs');
```

#### 4.1 Read Files

The `fs.readFile()` method is used to read files on your computer.

```
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
```

#### 4.2 Create Files

The File System module has methods for creating new files:

- `fs.appendFile()`
- `fs.open()`
- `fs.writeFile()`

The `fs.appendFile()` method appends specified content to a file. If the file does not exist, the file will be created:

```
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {

  if (err) throw err;

  console.log('Saved!');

}); 
```

The `fs.open()` method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:

```
var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {

  if (err) throw err;

  console.log('Saved!');

});

```

The `fs.writeFile()` method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created:

````
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {

  if (err) throw err;

  console.log('Saved!');

});

````



#### 4.3 Update Files

The File System module has methods for updating files:

- `fs.appendFile()`
- `fs.writeFile()`

The `fs.appendFile()` method appends the specified content at the end of the specified file:

```
var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {

  if (err) throw err;

  console.log('Updated!');

}); 

```

The `fs.writeFile()` method replaces the specified file and content:

```
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {

  if (err) throw err;

  console.log('Replaced!');

});

```

#### 4.4 Delete Files

To delete a file with the File System module,  use the `fs.unlink()` method.

The `fs.unlink()` method deletes the specified file:

```
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {

  if (err) throw err;

  console.log('File deleted!');

}); 

```

####4.5 Rename Files

To rename a file with the File System module,  use the `fs.rename()` method.

The `fs.rename()` method renames the specified file:

```
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {

  if (err) throw err;

  console.log('File Renamed!');

});

```



### 5. EVENTS Module

Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.

In addition, all event properties and methods are an instance of an EventEmitter object. To be able to access these properties and methods, create an EventEmitter object:

```
var events = require('events');

var eventEmitter = new events.EventEmitter();

```

- **The EventEmitter Object**

You can assign event handlers to your own events with the EventEmitter object.

In the example below we have created a function that will be executed when a "scream" event is fired.

To fire an event, use the `emit()` method.

```


var events = require('events');

var eventEmitter = new events.EventEmitter();

//Create an event handler:

var myEventHandler = function () {

  console.log('I hear a scream!');

}

//Assign the event handler to an event:

eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:

eventEmitter.emit('scream');

```

### 6. The Formidable Module

There is a very good module for working with file uploads, called "Formidable".

After you have downloaded the Formidable module, you can include the module in any application:

`var formidable = require('formidable');`

- Upload Files

Now you are ready to make a web page in Node.js that lets the user upload files to your computer:

— **Step 1: Create an Upload Form**

Create a Node.js file that writes an HTML form, with an upload field:

This code will produce an HTML form:

```
var http = require('http');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');

  res.write('<input type="file" name="filetoupload"><br>');

  res.write('<input type="submit">');

  res.write('</form>');

  return res.end();

}).listen(8080); 

```

— **Step 2: Parse the Uploaded File**

Include the Formidable module to be able to parse the uploaded file once it reaches the server.

When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.

The file will be uploaded, and placed on a temporary folder:

```
var http = require('http');

var formidable = require('formidable');

http.createServer(function (req, res) {

if (req.url == '/fileupload') {    
	var form = new formidable.IncomingForm();    
	form.parse(req, function (err, fields, files) {      
		res.write('File uploaded');      
		res.end();    
	});  
} 
else {

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');

    res.write('<input type="file" name="filetoupload"><br>');

    res.write('<input type="submit">');

    res.write('</form>');

    return res.end();

  }

}).listen(8080); 

```

— **Step 3: Save the File**

When a file is successfully uploaded to the server, it is placed on a temporary folder.

The path to this directory can be found in the "files" object, passed as the second argument in the `parse()` method's callback function.

To move the file to the folder of your choice, use the File System module, and rename the file:

```


var http = require('http');

var formidable = require('formidable');

var fs = require('fs');

http.createServer(function (req, res) {

  if (req.url == '/fileupload') {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

		var oldpath = files.filetoupload.path;     
        var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;   
        fs.rename(oldpath, newpath, function (err) {        
        	if (err) throw err;        
        	res.write('File uploaded and moved!');        
        	res.end();      
        }); 
      });
  } else {

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');

    res.write('<input type="file" name="filetoupload"><br>');

    res.write('<input type="submit">');

    res.write('</form>');

    return res.end();

  }

}).listen(8080);

```

### 7. The Nodemailer Module

`var nodemailer = require('nodemailer');`

####7.1 Send an Email

Now you are ready to send emails from your server.

Use the username and password from your selected email provider to send an email. This tutorial will show you how to use your Gmail account to send an email:

```
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 

```

And that's it! Now your server is able to send emails.

####7.2 Multiple Receivers

To send an email to more than one receiver, add them to the "to" property of the mailOptions object, separated by a comma:

Send email to more than one address:

```
var mailOptions = {
  from: 'youremail@gmail.com',
  to: '*myfriend@yahoo.com*, *myotherfriend@yahoo.com*',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
} 
```

####7.3 Send HTML

To send HTML formatted text in your email, use the "html" property instead of the "text" property:

```
Send email containing HTML:

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
  }

```



