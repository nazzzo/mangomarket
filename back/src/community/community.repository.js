class CommunityRepository {
    constructor({ Community, Comment }) {
        this.Community = Community
        this.Comment = Comment
        
    }
    async findComments({id}){
        try{
            const response = await this.Comment.findAll({raw: true, where: {communityid: id}})
            return response
        } catch(e){
            throw new Error(e)
        }
    }

    async findOne({id}){
        try {
            console.log("findoneid:::",id)
            const boardView = await this.Community.findOne({ raw: true, where: {id} })
            const commentList = await this.Comment.findAll({raw: true, where: {communityid: id}})
            console.log(`commentList:::`, commentList) 
            return {boardView, commentList}
        } catch(e){
            throw new Error(e)
        }
    }

    async createWriting({email ,subject, content}){
        try {
        const create = await this.Community.create({email, subject, content})
        return create
        } catch (e){
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
            const create = await this.Comment.create({raw: true, communityid: commentData.id, content: commentData.content})
            console.log('create:', create)
            const findAll = await this.Comment.findAll({raw: true, where: {communityid: commentData.id}})
            console.log(findAll)
            return findAll
        } catch (e) {
            throw new Error(e)
        }
    }
    async update({ id, content }) {
        try {
            const update = await this.Community.update({ content: content }, { where: { id: id } })
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
            return destroy
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommunityRepository
