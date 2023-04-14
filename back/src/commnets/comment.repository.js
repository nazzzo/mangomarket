class CommunityRepository {
    constructor({ Community, Comment, sequelize, User }) {
        this.Community = Community
        this.Comment = Comment
        this.sequelize = sequelize
        this.User = User
    }

    async findOne({ id }) {
        try {
            console.log('findoneid:::', id)
            const boardView = await this.Community.findOne({ raw: true, where: { id } })
            let commentList = await this.Comment.findAll({
                raw: true,
                where: { communityid: id },
            })
            console.log(`commentList:::`, commentList)
            const email = commentList.map((comment) => comment.email)
            const username = email.map((email)=>{
                return this.User.findOne({raw: true, where: {email}})
            }) 

            const nickname = ( await Promise.all(username)).map((user) => user.username)
            commentList = commentList.map((comment, index)=> {
                comment.username = nickname[index]
                return comment
            })
            console.log(commentList)

            return { boardView, commentList, email }
        } catch (e) {
            throw new Error(e)
        }
    }

    async createWriting({ email, subject, content, category }) {
        try {
            const create = await this.Community.create({ email, subject, content, category })
            return create
        } catch (e) {
            throw new Error(e)
        }
    }

    async findAll() {
        try {
            // const findAll = await this.Community.findAll({
            //     order: [['id', 'DESC']],
            // })
            const sql = `
                SELECT 
                A.id,A.email,A.subject,A.content,A.createdAt,A.updatedAt,A.category,B.username,B.userImg,
                (SELECT COUNT(communityid) FROM Comment WHERE communityid = A.id) AS CommentCount
                FROM Community AS A JOIN User AS B ON A.email = B.email
                ORDER BY A.id DESC;
            `

            const findComment = await this.sequelize.query(sql)
            console.log(findComment)

            return findComment
        } catch (e) {
            throw new Error(e)
        }
    }

    async create(commentData) {
        console.log('commentData', commentData)
        try {
            const create = await this.Comment.create({
                raw: true,
                communityid: commentData.id,
                content: commentData.content,
                email: commentData.email
            })
            console.log('create:', create)
            const findAll = await this.Comment.findAll({
                raw: true,
                where: { communityid: commentData.id },
            })
            console.log(findAll)
            return findAll
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

    async updateComment({ id, idx, content }) {
        try {
            const [updateComment] = await this.Comment.update(
                { content: content },
                { where: { communityid: id, id: idx } }
            )
            return updateComment
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

    async destroyComment(id, idx) {
        console.log('commentid :', id)

        try {
            const destroy = await this.Comment.destroy({
                where: { communityid: id, id: idx },
            })
            console.log('destroy ::: ', destroy)
            return destroy
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommunityRepository
