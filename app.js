/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var winston = require('winston');
var nodemailer = require("nodemailer");
var port = 3000;
var hostname = 'localhost';
var config = require('./config');
var users = require('./routes/userRouter');
var pets = require('./routes/petRouter');
var events = require('./routes/eventRouter');
var PetChat = require('./models/petChat');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/pets', pets);
app.use('/events', events);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected correctly to server");
});

io.on('connection', function(socket) {

  socket.on('join:room', function(data) {
    console.log("join: " + data.room_name);
    var room_name = data.room_name;
    socket.join(room_name);
  });


  socket.on('leave:room', function(msg) {
    msg.text = msg.user + " has left the room";
    socket.in(msg.room).emit('exit', msg);
    socket.leave(msg.room);
    console.log(msg);
  });

  socket.on('send:message', function(msg) {
    console.log("send:msg");
    console.log(msg.room);
    console.log(msg);
    socket.in(msg.room).emit('message created', msg);
    var thisChat = new PetChat({
      user: msg.user,
      text: msg.text,
      room: msg.room,
      created: msg.time
    });
    thisChat.save(function(err) {
      if (err) {
        console.log(err);
      }
    })
  });

});


http.listen(port, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});


module.exports = app;