# NODE.JS Document

@(FE)[Nodejs | Nov 15th 2017 | Asian Tech ]

------

[TOC]

------

## Authentication With Passport Module

Work with passport Module for log in and log out. 

Authenticate with jade view.

### 1. Passport Module

- This a a library help you authentication in nodejs. It designs into module so Passport is very easy to integrate into our app.

- This module also adapt with so many types of login. With modern web structure, they require a way to login by social account. Passport was born to deal with it.

- Install: `npm install passport`.

- Import it into app.js: `var passport = require('passport');`

- Don't forget to put the initialization:

  `app.use(passport.initialize());`

  `app.use(passport.session());`


####a. Authenticate

This call by `passport.authenticate()`. In this, authenticate() is a function to connect to middleware. 

```
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/users/' + req.user.username);
  });
```

if authenticate() has error, `status 401 Unauthorized ` and all routes were call will be useless. If success, Passport will make user identification and call the next route.

#### b. Attribute of authenticate():

```
passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login', failureFlash: true, successFlash: 'Welcome!' })
```

Notice: in order to use the flash type: `req.flash()`. Import the **connect-flash** module.

`passport.authenticate('basic', { session: false })` : in order to turn off the sessions. 

#### c. Authen with UserName and Password

- Work with module [passport-local](https://github.com/jaredhanson/passport-local)

- install: `npm install passport-local`

- We need to config a Local Strategy which is defined by passport-local by `var LocalStrategy = require('passport-local').Strategy;`

- Setup like this:

  ```
  passport.use(new LocalStrategy(
    function(username, password, done){
      User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user) {
          console.log('Unknown User');
          return done(null, false, {message: 'Unknown User'});
        }
        User.comparePassword(password, user.password, function(err,isMatch){
          if(err) throw err;
          if(isMatch) {
            return done(null,user);
          } else {
            console.log('Invalid Password');
            return done(null,false, {message: ' Invalid user or password'});
          }
        })
      });
    }
  ))
  ```

- also need a form : 

  ```
  <form action="/login" method="post">
      <div>
          <label>Username:</label>
          <input type="text" name="username"/>
      </div>
      <div>
          <label>Password:</label>
          <input type="password" name="password"/>
      </div>
      <div>
          <input type="submit" value="Log In"/>
      </div>
  </form>
  ```

- **Noticed**: The default Passport-local will find the params have name: `username & password`, but if you want to change ( usernameField will be 'email', passwordField will be 'passwd', use this way:

  ```
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username,password,done){
    ////
  }
  ));
  ```

  ​

#### d. Serialize

We need to declare 2 function like this:

```
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.user.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});
```

The content below will be describe all.

### 2. The process

- When peopel submit login form, a POST request will be create to URL `/login`, it will run middleware `passport.authenticate()`.  After that, it will call to the scenario **Local** we had set up `LocalStrategy`.

- It will get the value `req.body.username`and `req.body.password` and assign to verify local function. We will query the databast and check passport of user right or wrong. In error case, db will call a callback named `done` with param `err`. When it cannot find any person it will call `done(null,false)`, if the right login information, we call done(null,user). When a callback done was call, it will get the value of error, user and custom data, send back to `passport.authenticate()`.

- If the data of callback is null and true, the authentication is successful, continue to call `req.login` ( this function will be attach to each request automatically when you config passport).

- req.login call the `passport.serializeUser `. THis function access to user object which we return to middleware authenticate() and determined which part of object will be save in session. The result of this function is we have `req.session.passport.user` by the info we pass in serializeUser. 

- The authentication is over, requestHandler will call us to the setup page.

- Of course, we still need to login 1 time. In the next requests, the passport continue to work:

  - With each request, express will load the data in session and assign it into request object( req.session). In above, we use the serializeUser function to pass data into session so we can find it in `req.session.passport.user`.
  - Middleware start passport(passport.initialize) wil lcheck in request session have passport.user or not. if not, it is unauthorize, `req.session.passport.user = {}`
  - When request is authorized, it wil lcalll passport.deserializeUser. This function use the infomation in session to get full data and assign it into req.user.

- Popular middleware of passport:

  - passport.initialize: middleware will call in each request, check session to get passport.user if not will create {}.

  - Passport.session: middleware use the Passport scenario, use session to get user info and assign to req.user

  - passport.deserializeUser: fuction call by passport.session. Help use get user info and based on info saved in session, they assign to req.user.

  - Passport.authenticate: middleware help us assign local scenario into route.

  - Passport.serializeUser: the function calll when successful authentication to save user info into session.

  - In each request, passport assign 4 function:

    — req.login(), req.logout(), req.isAuthenticated(), req.isUnauthenticated().

### 3. Some tricks

- How to show the flash like this to the view: `req.flash('success', ' You have logg in');`

  just add `!= messages()` in jadeview. this line will be render the content of flash. 

- Authentication with view by which way?

  - ` req.user` always contains the info of user, so we assign it to `res.locals.user`

  ```
  app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
  });
  ```

  - In the view, just use `user` variable in if else

  ```
   if user
     li.nav-item
    	 a.nav-link(href="/users/logout") Logout
  ```

  The **a** tag only appear when user existed.

