class CommunityService {
    constructor({ communityRepository, config, userRepository }) {
        this.communityRepository = communityRepository
        this.config = config
        this.BadRequest = config.exception.BadRequest
        this.userRepository = userRepository
    }

    async postComment({ id, content, email, parentId, currentPage }) {
        try {
            const limit = !currentPage ? currentPage * 10 : (currentPage -1) * 10
            console.log(limit)
            const commentList = await this.communityRepository.create({ id, content, email, parentId, limit })
            console.log('commentList::', commentList)
            return commentList
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async getWriting({ id, page }) {
        try {
            const limit = (page - 1) * 10
            console.log('2', limit)
            const view = await this.communityRepository.findOne({ id, limit })
            const { username } = await this.userRepository.getUserById(view.boardView.email)
            view.boardView.username = username
            console.log('view.commentList', view.commentList)
            return view
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async getProfileList({ email }) {
        try {
            console.log('getProfileList ::: ', email)

            const list = await this.communityRepository.findProfilListAll({ email })

            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async getList({ count }) {
        try {
            console.log('count service ::: ', count)

            const views = 4
            let limitval = views * count

            if (!count || Number(count) === 1) limitval = 0
            const limit = {
                limit: limitval,
                views,
            }

            const [list] = await this.communityRepository.findAll({ limit })
            console.log('list', list)
            if (list.length === 0) throw '내용이 없습니다'
            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async postCommunity({ email, content, subject, category }) {
        console.log(`serv :`, { email, content, subject, category })
        try {
            if (!subject || !content) throw '내용이 없습니다'
            const community = await this.communityRepository.createWriting({
                email,
                content,
                subject,
                category,
            })
            return community
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async putCommunity(id, content, subject) {
        console.log(`serv :`, { id, subject, content })
        try {
            const comment = await this.communityRepository.update({ id, content, subject })
            if (comment < 1) throw '수정할 게시글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async putComment(id, idx, content, isDeleted) {
        try {
            const comment = await this.communityRepository.updateComment({ id, idx, content, isDeleted })
            if (comment < 1) throw '수정할 댓글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async deleteCommunity(id) {
        // console.log(`serv :`, id);
        try {
            const comment = await this.communityRepository.destroy(id)
            if (comment < 1) throw '삭제할 댓글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async deleteComment(id, idx) {
        try {
            const comment = await this.communityRepository.destroyComment(id, idx)
            if (comment < 1) throw '삭제할 댓글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
}

module.exports = CommunityService
