const express = require('express')
const router = express.Router()
const Evaluation = require('../models/evaluation.model')
const crudController = require('../crudcontroller/crud.controller')



router.post("", crudController.post(Evaluation))
router.get("", crudController.get(Evaluation))


module.exports = router