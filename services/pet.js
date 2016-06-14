/*
 * 2016: Petime, MIT
 * All Rights Reserved.
 * @author Juan Sebastian Hormaza
 */
/**
 * @module Pet
 */
/**
 * @requires all sources
 */

/*
 * 2016: Petime, MIT
 * All Rights Reserved.
 * @author Juan Sebastian Hormaza
 */
/**
 * @module Pet
 */
/**
 * @requires all sources
 */
var Pet = function() {}
var express = require('express');
var path = require('path');
var passport = require('passport');
var request = require("request");
var winston = require('winston');
var Pet = require('../models/pet');
var PetChat = require('../models/petChat');
var self = this;
var options = {};

Pet.prototype.getMsgs = function(req, res) {
    PetChat.find({
        'room': req.params.id
    }, function(err, Pets) {
        if (err) throw err;
        res.json(Pets);
    });
}

Pet.prototype.deleteMsgs = function(req, res) {
    PetChat.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}


Pet.prototype.getAll = function(req, res) {
    Pet.find({}, function(err, Pet) {
        if (err) throw err;
        res.json(Pet);
    });
}

Pet.prototype.getById = function(req, res) {
    Pet.findById(req.params.id, function(err, Pet) {
        if (err) throw err;
        res.json(Pet);
    });
}

Pet.prototype.getByUserId = function(req, res) {
    console.log('getByUserId');
    Pet.find({
        id_user_rescue: req.params.id
    }, function(err, Pets) {
        if (err) throw err;
        res.json(Pets);
    });
}
Pet.prototype.getByNotUserId = function(req, res) {
    Pet.find({
        $and: [{
            'id_user_rescue': {
                '$ne': req.params.id + ''
            }
        }, {
            'status': {
                '$ne': 'adopted'
            }
        }]
    }, function(err, Pets) {
        res.json(Pets);
    });
}

Pet.prototype.getByPetname = function(req, res) {
    Pet.find({
        id_user_rescue: req.params.id
    }, function(err, Pet) {
        if (err) throw err;
        res.json(Pet);
    });
}

Pet.prototype.insert = function(req, res) {
    var pet = new Pet({
        name: req.body.name,
        country: req.body.country,
        city: req.body.city,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        color: req.body.color,
        size: req.body.size,
        age: req.body.age,
        principal_image: req.body.principal_image,
        id_user_rescue: req.body.id_user_rescue,
        status: req.body.status
    });
    pet.save(function(err, pet) {
        if (err) console.log(err);
        console.log(pet);
        res.send(pet);
    });
}

Pet.prototype.deleteAll = function(req, res) {
    Pet.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}

Pet.prototype.delete = function(req, res) {
    Pet.findByIdAndRemove(req.params.id, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}

Pet.prototype.update = function(req, res) {
    Pet.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function(err, Pet) {
        if (err) throw err;
        res.json(Pet);
    });
}

Pet.prototype.className = "Pet";

module.exports.create = function() {
    return new Pet();
};


module.exports._class = Pet;