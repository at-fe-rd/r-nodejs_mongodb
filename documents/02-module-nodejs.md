# NODE.JS Document

@(FE)[Nodejs | Oct 30th 2017 | Asian Tech ]

------

[TOC]

------

## Module in Nodejs

Nodejs use the Module architect to optimize the creating complex app.

Module is likely to libraries in C, C#, java.

Each module contains a combination of function related to an Object in Module.

For example:

http is Module contains specific functions relating to HTTP configs.

Nodejs provided some core Module to help us access file in their system. create HTTP server, TCP/UDP, and some benefical plugins.

Before using Module, This way help you declaring it with **require()** function:

```
var http = require("http");
```

REMIND THAT: **Nodejs in only an environment, you have to do everything**

- **Exports Object**:

  Module is code package. Code in module is private - means the functions, variables is defined and access by inside of module. 

  ```
  var PI = Math.PI;
    
  exports.dientich = function (r) {
    return PI * r * r;
  };
    
  exports.chuvi = function (r) {
    return 2 * PI * r;
  };
  ```

  ​

- Global scope in Nodejs

  Nodejs is an environment allow us to code Javascript in serverside and run in Google's V8 JavaScript engine. However, if you want to use global variables, you can easily create it by defined the name of variables with no **var** keyword:

  ```
  globalVariable = 1;
  globalFunction = function () { ... };
  ```

  ​	— Note that global variables should maximum restriction.
