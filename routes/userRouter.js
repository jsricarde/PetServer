/*
* 2016: Petime, MIT
* All Rights Reserved.
* @author Juan Sebastian Hormaza
*/
/**
* @module User Router
*/
/**
 * @requires all sources
 */
var express = require('express');
var userReq = require('../services/user');
var User = userReq.create();
var userRouter = express.Router();
/**
 * @routes user operations
 */
userRouter.post('/register',User.register);
userRouter.post('/login',User.login);
userRouter.post('/upload',User.upload);
userRouter.delete('/',User.deleteAll);
userRouter.put('/:id',User.update);
userRouter.get('/',User.getAll);
userRouter.get('/:id',User.getById);
userRouter.get('/email/:email',User.getByEmail);
userRouter.get('/username/:username',User.getByUsername);


module.exports = userRouter;