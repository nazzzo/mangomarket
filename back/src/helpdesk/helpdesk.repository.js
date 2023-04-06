class HelpDeskRepository {
    constructor({ HelpDesk, Community, sequelize, User, Comment }) {
        this.HelpDesk = HelpDesk
        this.Community = Community
        this.sequelize = sequelize
        this.User = User
        this.Comment = Comment
    }

    async findAll() {
        try {
            const sql = `
                SELECT * FROM helpdesk ORDER BY id DESC;
            `

            const findAll = await this.sequelize.query(sql)
            console.log('findComment ::: ', findAll)
            return findAll
        } catch (e) {
            throw new Error(e)
        }
    }

    async findOne(id) {
        try {
            const query = `SELECT subject, content FROM helpdesk WHERE id = ${id};`
            const [findOne] = await this.sequelize.query(query)
            console.log('findOne ::: ', findOne)
            return findOne
        } catch (e) {
            throw new Error(e)
        }
    }
    async answer({ answer, id }) {
        try {
            console.log('repository answer ::: ', answer)
            const query = `UPDATE HelpDesk SET answer='${answer}' , answerBoolean = true WHERE id = '${id}';`
            const [postAnswer] = await this.sequelize.query(query)
            console.log('postAnswer ::', postAnswer)
            return postAnswer
        } catch (e) {
            throw new Error(e)
        }
    }
    async create({ content, subject, pageState }) {
        try {
            const create = await this.HelpDesk.create({
                subject,
                content,
                pageState,
            })
            return create
        } catch (e) {
            throw new Error(e)
        }
    }

    async createWrite({ name, message, pageState, email }) {
        try {
            const create = await this.HelpDesk.create({
                content: message,
                subject: '1:1문의입니다.',
                pageState,
                email,
                name,
            })
            return create
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = HelpDeskRepository
