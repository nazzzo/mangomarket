class CommunityService {
    constructor({ communityRepository, config, userRepository }) {
        this.communityRepository = communityRepository
        this.config = config
        this.BadRequest = config.exception.BadRequest
        this.userRepository = userRepository
    }

    async postComment({ id, content }) {
        try {
            const response = await this.communityRepository.create({ id, content })
            console.log('postComment', response)
            return response
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    /**get Writing 합치기 */
    // async getWriting({ id }) {
    //     try {
    //         const view = await this.communityRepository.findOne({ id })
    //         const { subject, content, email, createdAt } = view
    //         const { username } = await this.userRepository.getUserById(email)
    //         return { username, subject, content, createdAt, email, id }
    //     } catch (e) {
    //         throw new this.BadRequest(e)
    //     }
    // }

    async getWriting({ id }) {
        try {
            console.log('service', id)
            const view = await this.communityRepository.findOne({ id })
            const { username } = await this.userRepository.getUserById(view.boardView.email)
            view.boardView.username = username
            console.log(`view:::`, view)
            return view
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async getList() {
        try {
            const list = await this.communityRepository.findAll()
            if (list.length === 0) throw '내용이 없습니다'
            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async postCommunity({ email, content, subject }) {
        console.log(`serv :`, { email, content, subject })
        try {
            if (!subject || !content) throw '내용이 없습니다'
            const community = await this.communityRepository.createWriting({
                email,
                content,
                subject,
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

    async putComment(id, idx, content) {
        try {
            const comment = await this.communityRepository.updateComment({ id, idx, content })
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
