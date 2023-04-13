const express = require('express')
const router = express.Router()
const { controller } = require('./community.module')

router.get('/', (req, res, next) => controller.getList(req, res, next))

router.get('/profile', (req, res, next) => controller.getCommunityList(req, res, next))
router.post('/', (req, res, next) => controller.postCommunity(req, res, next))

router.get('/:id', (req, res, next) => controller.getWriting(req, res, next))
router.put('/:id', (req, res, next) => controller.putCommunity(req, res, next))
router.delete('/:id', (req, res, next) => controller.deleteCommunity(req, res, next))
router.post('/:id', (req, res, next) => controller.postComment(req, res, next))
router.put('/comment/:id/:idx', (req, res, next) => controller.putComment(req, res, next))
router.delete('/comment/:id/:idx', (req, res, next) => controller.deleteComment(req, res, next))

module.exports = router
