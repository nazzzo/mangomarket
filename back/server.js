const app = require('./app.js')
const socketIO = require("./socket.js")
const { sequelize } = require('./models')
const config = require('./config')
const PORT = config.port

const http = app.listen(PORT, async () => {
    await sequelize.sync({ force: false })


    // await sequelize.models.Category.create({ path: '/', name: '홈' })
    // await sequelize.models.Category.create({ path: '/signup', name: '회원가입', isLogin: false })
    // await sequelize.models.Category.create({ path: '/login', name: '로그인', isLogin: false })
    // await sequelize.models.Category.create({ path: '/logout', name: '로그아웃', isLogin: true })
    // await sequelize.models.Category.create({ path: '/profile', name: '프로필', isLogin: true })
    // await sequelize.models.Category.create({ path: '/community', name: '커뮤니티', isLogin: true })
    // await sequelize.models.Category.create({ path: '/board/write', name: '장터등록', isLogin: true })

    // await sequelize.models.BoardCategory.create({ id: 1, category: "생활가전" });
    // await sequelize.models.BoardCategory.create({ id: 2, category: "디지털기기" });
    // await sequelize.models.BoardCategory.create({ id: 3, category: "가구/인테리어" });
    // await sequelize.models.BoardCategory.create({ id: 4, category: "스포츠/레저" });
    // await sequelize.models.BoardCategory.create({ id: 5, category: "게임/음반" });
    // await sequelize.models.BoardCategory.create({ id: 6, category: "주방용품" });
    // await sequelize.models.BoardCategory.create({ id: 7, category: "유아용품" });
    // await sequelize.models.BoardCategory.create({ id: 8, category: "남성패션" });
    // await sequelize.models.BoardCategory.create({ id: 9, category: "여성패션" });
    // await sequelize.models.BoardCategory.create({ id: 10, category: "음식" });
    // await sequelize.models.BoardCategory.create({ id: 11, category: "반려동물" });
    // await sequelize.models.BoardCategory.create({ id: 12, category: "기타잡화" });

    console.log(`backend server listening on port ${PORT}`)
})

socketIO(http, app)
