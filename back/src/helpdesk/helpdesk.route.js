const express = require('express')
const router = express.Router()
const { controller } = require('./helpdesk.module')

router.post('/', (req, res, next) => controller.postReport(req, res, next))
router.get('/board', (req, res, next) => controller.getList(req, res, next))
router.get('/board/:id', (req, res, next) => controller.getListOne(req, res, next))
router.post('/board/:id', (req, res, next) => controller.postAnswerOne(req, res, next))
router.get('/profile', (req, res, next) => controller.postServiceOne(req, res, next))
module.exports = router
