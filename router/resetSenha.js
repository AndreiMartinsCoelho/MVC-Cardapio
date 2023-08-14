const express = require("express");
const router = express.Router();
const resetController = require('../Controller/resetController');

router.put("/", async (req, res, next) => {
  const result = await resetController.changePassword(req.body);
  res.status(200).send(result);
});

router.put("/reset", async (req, res, next) => {
    const result = await resetController.changePassword(req.body);
    res.status(200).send(result);
  });
  

module.exports = router;