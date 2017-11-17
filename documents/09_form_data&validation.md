# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Form Data & Validation

Basic about mongo Database

### 1. Form Data

- First we have to create a `<form>` in view file in order to input the information. There are 2 ways to validation. You can validate directly in jade file or in router. 
- I just show you how to validate in **router**, I use Jade view engine and my register form like that:


- ```
  form(method='post', action='/users/register', enctype='multipart/form-data')
      .form-group
        label Name
        input.form-control(name='name', type='text', placeholder='Enter Name')
      .form-group
        label Email
        input.form-control(name='email', type='email', placeholder='Enter Email')
      .form-group
        label Username
        input.form-control(name='username', type='text', placeholder='Enter Username')
      .form-group
        label Password
        input.form-control(name='password', type='password', placeholder='Enter Password')
      .form-group
        label Profile Image
        input.form-control(name='profileimage', type='file')
      input.btn.btn-default(type='submit', value ='Register')
  ```

  — Notice with the name of input. Each input always have name in order to help multer convert to object.

- After that, we need to handle the `router.post` when we click to Register submit button. The `req.body` will contain the information of the form-data:

  ```
  router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
  }
  ```

  ​

- We need to install the **multer** module if we want to get the form-data. Install by `npm install multer` and require it in app.js

- We have to check the error before make the next action. If any error occurs, nodejs will render that `register` jade again with the information you filled, no needs to input again. If no error, nodejs will create a new user. in chapter 8, we know how to connect to mongodb. If you are right in config, the user will appear in db.

  ```
  var errors = req.validationErrors();
    if(errors) {
      res.render('register', {
        errors: errors,
        name: name,
        email: email,
        username: username,
        password: password
      })
    } else {
      var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
      });
    }
  ```

  ​

### 2. Validation

How we deal about the information user input is not right. 

We will make nodejs check the form-data each time some one touch the submit button by `req.checkBody('key', 'notification')`

Ex: want to check the name is not empty or not. If not show 'Name field is required':

`req.checkBody('name', 'Name field is required').notEmpty();`

We also add some line in the view to show the errors:

```
ul.errors
    if errors
      each error, i in errors
        li.alert.alert-danger #{error.msg}
```

