/*
* 2016: Eventime, MIT
* All Rights Reserved.
* @author Juan Sebastian Hormaza
*/
/**
* @module Event
*/
/**
 * @requires all sources
 */
var Event = function () {
}
var express = require('express');
var path = require('path');
var request = require("request");
var winston = require('winston');
var Event = require('../models/event');
var self = this;
var options = {};

Event.prototype.getAll = function (req, res) {
    Event.find({}, function (err, Event) {
        if (err) throw err;
        res.json(Event);
    });
}

Event.prototype.getById = function (req, res) {
    Event.findById(req.params.id, function (err, Event) {
        if (err) throw err;
        res.json(Event);
    });
}

Event.prototype.insert = function (req, res) {
    var event = new Event(
        {
            name: req.body.name,
            country: req.body.country,
            city: req.body.city,
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            time_start_event: req.body.time_start_event,
            date_start_event: req.body.date_start_event,
            id_user_rescue: req.body.id_user_rescue,
            status: req.body.status
        }
    );
    event.save(function (err, event) {
        if (err) console.log(err);
        console.log(event);
        res.send(event);
    });
}

Event.prototype.deleteAll = function (req, res) {
    Event.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}

Event.prototype.delete = function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
}
Event.prototype.update = function (req, res) {
    Event.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
            new: true
        }, function (err, Event) {
            if (err) throw err;
            res.json(Event);
        });
}

Event.prototype.className = "Event";

module.exports.create = function () {
    return new Event();
};


module.exports._class = Event;