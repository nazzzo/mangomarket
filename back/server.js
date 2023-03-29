const app = require('./app.js')
const { sequelize } = require('./models')
const config = require('./config')
const PORT = config.port

app.listen(PORT, async () => {
    await sequelize.sync({ force: false })
    await sequelize.models.Category.create({ path: '/', name: 'Home' })
    await sequelize.models.Category.create({ path: '/signup', name: 'Signup', isLogin: false })
    await sequelize.models.Category.create({ path: '/login', name: 'Login', isLogin: false })
    await sequelize.models.Category.create({ path: '/logout', name: 'Logout', isLogin: true })
    await sequelize.models.Category.create({ path: '/profile', name: 'Profile', isLogin: true })
    await sequelize.models.Category.create({ path: '/comment', name: 'Comment', isLogin: true })
    
    
    await sequelize.models.BoardCategory.create({ category: "생활가전" });
    await sequelize.models.BoardCategory.create({ category: "디지털기기" });
    await sequelize.models.BoardCategory.create({ category: "가구/인테리어" });
    await sequelize.models.BoardCategory.create({ category: "스포츠/레저" });
    await sequelize.models.BoardCategory.create({ category: "게임/음반" });
    await sequelize.models.BoardCategory.create({ category: "주방용품" });
    await sequelize.models.BoardCategory.create({ category: "유아용품" });
    await sequelize.models.BoardCategory.create({ category: "남성패션" });
    await sequelize.models.BoardCategory.create({ category: "여성패션" });
    await sequelize.models.BoardCategory.create({ category: "음식" });
    await sequelize.models.BoardCategory.create({ category: "반려동물" });
    await sequelize.models.BoardCategory.create({ category: "기타잡화" });
    
    console.log(`backend server listening on port ${PORT}`)
})
