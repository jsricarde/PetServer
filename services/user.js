/*
 * 2016: Petime, MIT
 * All Rights Reserved.
 * @author Juan Sebastian Hormaza
 */
/**
 * @module User
 */
/**
 * @requires all sources
 */
var User = function() {}
var express = require('express');
var path = require('path');
var passport = require('passport');
var request = require("request");
var winston = require('winston');
var User = require('../models/user');
var multer = require('multer');
var Verify = require('./verify');

//var utilReq = require('../utils/utils');
//var Util = utilReq.create();
var self = this;
var options = {};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //implement relation the id user at the images folder
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir); // Directirio donde se guardaran los archivos.
    },
    filename: function(req, file, cb) {
        //implement relation the id user at the image
        var id = "id_of_the_user.jpg"
        console.log(file);
        cb(null, id);
    }
});

var upload = multer({
    storage: storage
}).single('file');


User.prototype.getAll = function(req, res) {
    User.find({}, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
}

User.prototype.getById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
}

User.prototype.getByEmail = function(req, res) {
    User.findOne({
        email: req.params.email
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
}

User.prototype.getByUsername = function(req, res) {
    User.findOne({
        username: req.params.username
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
}

User.prototype.register = function(req, res) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function(err, user) {
            //user = req.body;
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            if (req.body.first_name) {
                user.first_name = req.body.first_name;
            }
            if (req.body.last_name) {
                user.last_name = req.body.last_name;
            }
            if (req.body.type) {
                user.type = req.body.type;
            }
            if (req.body.email) {
                user.email = req.body.email;
                user.country = req.body.country;
                user.city = req.body.city;
                user.description = req.body.description;
                user.age = req.body.age;
                user.gender = req.body.gender;
                user.latitude = req.body.latitude;
                user.longitude = req.body.longitude;
            }
            user.save(function(err, user) {
                passport.authenticate('local')(req, res, function() {
                    return res.status(200).json({
                        status: 'Registration Successful!'
                    });
                });
            });
        });
}

User.prototype.upload = function(req, res) {
    console.log("start");
    upload(req, res, function(error) {
        if (error) {
            console.log(error);
            // An error occurred when uploading
            return res.send(error);
        }
        // Everything went fine
    });
    res.send("working fine");
}

User.prototype.deleteAll = function(req, res) {
    User.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}

User.prototype.update = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
}

User.prototype.login = function(req, res, next) {
    console.log("init");
    console.log(req.body);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: err
                });
            }
            var token = Verify.getToken(user);
            console.log(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token,
                user: user
            });
        });
    })(req, res, next);
}

User.prototype.className = "User";

module.exports.create = function() {
    return new User();
};


module.exports._class = User;