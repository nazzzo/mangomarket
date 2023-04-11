const express = require('express')
const router = express.Router()
const userRouter = require('../src/users/user.route')
const authRouter = require('../src/auths/auth.route')
const boardRouter = require('../src/boards/board.route')
const chatRouter = require('../src/chats/chat.route')
const communityRouter = require('../src/community/community.route')
const categoriesRouter = require('../src/categories/category.route')
const helpdeskRouter = require('../src/helpdesk/helpdesk.route')
const tempRouter = require('../src/temp/temp.route')
const reservationRouter = require('../src/reservations/reservation.route')


router.use('/categories', categoriesRouter)
router.use('/users', userRouter)
router.use('/auths', authRouter)
router.use('/boards', boardRouter)
router.use('/chats', chatRouter)
router.use('/community', communityRouter)
router.use('/helpdesk', helpdeskRouter)
router.use('/temp', tempRouter)
router.use('/reservations', reservationRouter)

module.exports = router
