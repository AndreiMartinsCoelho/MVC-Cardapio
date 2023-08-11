const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/userController');

userRouter.post('/', async (req, res, next) => {
    user = await userController.get(req.headers);
    res.status(200).send(user);
});

userRouter.post('/login', async(req, res, next)=>{
    user=await userController.login(req.body);
    res.status(200).send(user);
})

module.exports = userRouter;