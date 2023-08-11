const express=require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.status(200).send("<h1>Rodando na porta 3000 do LocalHost para aplicação em EJS+Express.JS no padrão MVC</h1>");
})

module.exports=router;