const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/userController');

userRouter.post('/', async (req, res, next) => {
    user = await userController.get(req.headers);
    res.status(200).send(user);
});

userRouter.post('/login', async(req, res, next)=>{
    const body = req.body;
    const loginResult = await userController.login(body, req); // Passando o objeto "req"
    res.json(loginResult);
    res.redirect('/ejs/home');
})

module.exports = userRouter;