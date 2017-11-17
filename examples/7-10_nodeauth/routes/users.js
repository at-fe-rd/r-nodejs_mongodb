var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if(req.files.profileimage){
    console.log('updalod file');
    var profileImageOriginalName = req.files.profileimage.originalname;
    var profileImageName = req.files.profileimage.name;
    var profileImageMime = req.files.profileimage.mimetype;
    var profileImagePath = req.files.profileimage.path;
    var profileImageExt = req.files.profileimage.extension;
    var profileImageSize = req.files.profileimage.size;
  } else {
    var profileImageName = 'noimage.png';
  }
  // form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('username', 'userName field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  // check for errors
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
      password: password,
      profileimage: profileImageName
    });
  }
  //create user
  User.createUser(newUser, function (err, user){
    if(err) throw err;
    console.log(user);
  });
  req.flash('success', 'you are now reigister and may login ');
  res.location('/');
  res.redirect('/');
});

passport.serializeUser(function(user,done) {
  done(null, user.id);
});

passport.deserializeUser(function(id,done) {
  User.getUserById(id, function(err,user) {
    done(err, user);
  });
});

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

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: 'Invalid username or password'}), function(req,res) {
  console.log('Authentication Success');
  req.flash('success', ' You have logg in');
  res.redirect('/');
})

router.get('/logout', function(req,res,next) {
  req.logout;
  req.flash('success', ' You have logged out');
  res.redirect('/users/login')
})

module.exports = router;
