const express = require('express')
const router = express.Router()
const { controller } = require('./helpdesk.module')

router.post('/', (req, res, next) => controller.postReport(req, res, next))

module.export = router
