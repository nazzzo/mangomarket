class CommunityRepository {
    constructor({ Community, Comment, sequelize, User }) {
        this.Community = Community
        this.Comment = Comment
        this.sequelize = sequelize
        this.User = User
    }

    async findOne({ id }) {
        try {
            // const boardView = await this.Community.findOne({ raw: true, where: { id } })
            const sql = `
            SELECT 
            A.id,A.email,A.subject,A.content,A.createdAt,A.updatedAt,A.category,B.username,B.userImg,
            (SELECT COUNT(communityid) FROM Comment WHERE communityid = A.id) AS CommentCount
            FROM Community AS A JOIN User AS B ON A.email = B.email
            WHERE A.id = ${id};
        `
            const [[boardView]] = await this.sequelize.query(sql)
            
            // const commentSql = `
            // select A.id,A.content,A.createdAt,A.email,A.parentId,B.username,B.userImg from Comment as A join User as B on A.email = B.email
            // `
            const commentSql = `
                SELECT A.id, A.content, A.createdAt, A.email, A.parentId, A.isDeleted, B.username, B.userImg
                FROM Comment AS A
                JOIN User AS B ON A.email = B.email
                ORDER BY CASE WHEN parentId = 0 THEN id ELSE parentId END, A.createdAt ASC;`
            const [commentList] = await this.sequelize.query(commentSql)
            console.log('commentinfo::', commentList)
            // let commentList = await this.Comment.findAll({
            //     raw: true,
            //     where: { communityid: id },
            // })
            // const email = commentList.map((comment) => comment.email)
            // const username = email.map((email)=>{
            //     return this.User.findOne({raw: true, where: {email}})
            // }) 
            // const nickname = ( await Promise.all(username)).map((user) => user.username)
            // commentList = commentList.map((comment, index)=> {
            //     comment.username = nickname[index]
            //     return comment
            // })
            return { boardView, commentList }
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

    async findAll({ limit }) {
        try {
            // const findAll = await this.Community.findAll({
            //     order: [['id', 'DESC']],
            // })
            const limitquery = !limit ? `` : `Limit ${limit.limit}, ${limit.views}`
            const sql = `
                SELECT 
                A.id, A.email, A.subject, A.content, A.createdAt, A.updatedAt, A.category, B.username, B.userImg,
                (SELECT COUNT(communityid) FROM Comment WHERE communityid = A.id) AS CommentCount,
                    CASE 
                        WHEN A.category = '공지사항' THEN 0 
                        ELSE 1 
                    END AS category_order
                FROM Community AS A 
                JOIN User AS B 
                ON A.email = B.email
                ORDER BY category_order ASC, A.id DESC
                ${limitquery}
                ;
            `
            /**
             *  SELECT 
                A.id,A.email,A.subject,A.content,A.createdAt,A.updatedAt,A.category,B.username,B.userImg,
                (SELECT COUNT(communityid) FROM Comment WHERE communityid = A.id) AS CommentCount
                FROM Community AS A JOIN User AS B ON A.email = B.email
                ORDER BY A.id DESC;
             */

            const findComment = await this.sequelize.query(sql)
            console.log('findComment ::: ', findComment)

            return findComment
        } catch (e) {
            throw new Error(e)
        }
    }

    async findProfilListAll({ email }) {
        try {
            const findAll = await this.Community.findAll({ raw: true, where: { email } })

            console.log('comu repository :: ', findAll)

            return findAll
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
                email: commentData.email,

            })
            console.log('create:', create)
            const findAll = await this.Comment.findAll({
                raw: true,
                where: { communityid: commentData.id },
                parentId: commentData.parentId,
            })
            // const findAll = await this.Comment.findAll({
            //     raw: true,
            //     where: { communityid: commentData.id },
            // })
            // const email = findAll.map((comment) => comment.email)
            // const username = email.map((email)=>{
            //     return this.User.findOne({raw: true, where: {email}})
            // }) 
            // const nickname = ( await Promise.all(username)).map((user) => user.username)
            // const commentList = findAll.map((comment, index)=> {
            //     comment.username = nickname[index]
            //     return comment
            // })

            const commentSql = `
            SELECT A.id, A.content, A.createdAt, A.email, A.parentId, A.isDeleted, B.username, B.userImg
                FROM Comment AS A
                JOIN User AS B ON A.email = B.email
                ORDER BY CASE WHEN parentId = 0 THEN id ELSE parentId END, A.createdAt ASC;
            `
            const [commentList] = await this.sequelize.query(commentSql)
            return commentList
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

    async updateComment({ id, idx, content, isDeleted }) {
        try {
            const [updateComment] = await this.Comment.update(
                { content , isDeleted
                },
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
