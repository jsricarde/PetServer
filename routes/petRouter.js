/*
* 2016: Petime, MIT
* All Rights Reserved.
* @author Juan Sebastian Hormaza
*/
/**
* @module PetRouter
*/
/**
 * @requires all sources
 */
var express = require('express');
var petReq = require('../services/pet');
var Pet = petReq.create();
var petRouter = express.Router();
/**
 * @routes user operations
 */
petRouter.post('/insert',Pet.insert);
petRouter.put('/:id',Pet.update);
petRouter.delete('/:id',Pet.delete);
petRouter.post('/msgs/',Pet.deleteMsgs);
petRouter.delete('/',Pet.deleteAll);
petRouter.get('/',Pet.getAll);
petRouter.get('/:id',Pet.getById);
petRouter.get('/userId/:id',Pet.getByUserId);
petRouter.get('/userNotId/:id',Pet.getByNotUserId);
petRouter.get('/msgs/:id',Pet.getMsgs);


module.exports = petRouter;