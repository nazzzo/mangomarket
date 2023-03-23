const app = require('./app.js')
const { sequelize } = require('./models')
const config = require('./config')
const PORT = config.port

app.listen(PORT, async () => {
    await sequelize.sync({ force: true })
    await sequelize.models.Category.create({ path: '/', name: 'Home' })
    await sequelize.models.Category.create({ path: '/signup', name: 'Signup', isLogin: false })
    await sequelize.models.Category.create({ path: '/login', name: 'Login', isLogin: false })
    await sequelize.models.Category.create({ path: '/logout', name: 'Logout', isLogin: true })
    await sequelize.models.Category.create({ path: '/profile', name: 'Profile', isLogin: true })
    await sequelize.models.Category.create({ path: '/comment', name: 'Comment', isLogin: true })
    console.log(`backend server listening on port ${PORT}`)
})
