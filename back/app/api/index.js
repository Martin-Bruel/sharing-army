const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UsersRouter = require('./users')
const GameRouter = require('./game')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UsersRouter)
router.use('/game', GameRouter)

module.exports = router
