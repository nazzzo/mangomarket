const express = require('express')
const router = express.Router()
const { controller } = require('./temp.module')

router.get('/', (req, res, next) => controller.getTempData(req, res, next))
router.post('/write', (req, res, next) => controller.postTempData(req, res, next))

module.exports = router
