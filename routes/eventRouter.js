/*
* 2016: Petime, MIT
* All Rights Reserved.
* @author Juan Sebastian Hormaza
*/
/**
* @module EvenRouter
*/
/**
 * @requires all sources
 */
var express = require('express');
var eventReq = require('../services/event');
var Event = eventReq.create();
var eventRouter = express.Router();
/**
 * @routes user operations
 */
eventRouter.post('/insert',Event.insert);
eventRouter.put('/:id',Event.update);
eventRouter.delete('/:id',Event.delete);
eventRouter.delete('/',Event.deleteAll);
eventRouter.get('/',Event.getAll);
eventRouter.get('/:id',Event.getById);


module.exports = eventRouter;