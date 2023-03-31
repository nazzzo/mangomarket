class CommunityRepository {
    constructor({ Community }) {
        this.Community = Community
    }

    async findOne({ id }) {
        try {
            const response = await this.Community.findOne({ raw: true, where: { id } })
            console.log(response)
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async createWriting({ subject, content }) {
        try {
            const create = await this.Community.create({ subject, content })
            return create
        } catch (e) {
            throw new Error(e)
        }
    }
    async findAll() {
        try {
            const findAll = await this.Community.findAll({
                order: [['id', 'DESC']],
            })
            return findAll
        } catch (e) {
            throw new Error(e)
        }
    }

    // async findOne(boardId) {
    //     try {
    //         console.log('repository boardId', boardId)
    //         const boardView = await this.Community.findOne({
    //             raw: true,
    //             where: { id: boardId },
    //         })
    //         console.log(boardView)
    //         return boardView
    //     } catch (e) {
    //         throw new Error(e)
    //     }
    // }
    async create(commentData) {
        console.log('commentData', commentData)
        try {
            const create = await this.Community.create(commentData)
            console.log(create)
            return create
        } catch (e) {
            throw new Error(e)
        }
    }
    async update({ id, content, subject }) {
        try {
            const [update] = await this.Community.update(
                { content: content, subject: subject },
                { where: { id: id } }
            )
            return update
        } catch (e) {
            throw new Error(e)
        }
    }
    async destroy(id) {
        console.log('repo :', id)
        try {
            const destroy = await this.Community.destroy({
                where: { id: id },
            })
            console.log('destroy ::: ', destroy)
            return destroy
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommunityRepository
