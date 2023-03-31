class CommunityRepository {
    constructor({ Community, Comment }) {
        this.Community = Community
        this.Comment = Comment
        
    }

    // async findOne({id}){
    //     try {
    //         console.log("findoneid:::",id)
    //         const boardView = await this.Community.findOne({ raw: true, where: {id} })
    //         const commentList = await this.Comment.findAll({raw: true, where: {communityid: id}})
    //         console.log(`commentList:::`, commentList) 
    //         return {boardView, commentList}
    //     } catch(e){
    //         throw new Error(e)
    //     }
    // }

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

    async updateComment({ id, idx, content }) {
        try {
            const [updateComment] = await this.Comment.update({ content: content }, { where: { communityid: id, id: idx } })
            return updateComment
        } catch (e) {
            throw new Error(e)
        }
    }

    async destroyComment(id, idx) {
        console.log('commentid :', id)
        try {
            const destroy = await this.Comment.destroy({
                where: { communityid: id, id: idx },
            })
            return destroy
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommunityRepository
