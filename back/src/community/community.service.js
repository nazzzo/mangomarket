class CommunityService {
    constructor({ communityRepository, config, userRepository }) {
        this.communityRepository = communityRepository
        this.config = config
        this.BadRequest = config.exception.BadRequest
        this.userRepository = userRepository
    }

    async getWriting({id}){
        try{
            const view = await this.communityRepository.findOne({id})
            const {subject, content, email, createdAt} = view
            const {username} = await this.userRepository.getUserById(email)
            return {username, subject, content, createdAt}
        } catch(e){
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

    async getView({ boardId }) {
        try {
            console.log('Service boardId ::', boardId)
            const list = await this.communityRepository.findOne(boardId)
            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async postCommunity({ email, content, subject }) {
        console.log(`serv :`, { email, content, subject })
        try {
            if (!subject || !content) throw '내용이 없습니다'
            const community = await this.communityRepository.create({ email, content, subject })
            return community
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
    async putComment(id, content) {
        // console.log(`serv :`, { id, content });
        try {
            const comment = await this.communityRepository.update({ id, content })
            if (comment < 1) throw '수정할 댓글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
    async deleteComment(id) {
        // console.log(`serv :`, id);
        try {
            const comment = await this.communityRepository.destroy(id)
            if (comment < 1) throw '삭제할 댓글이 없습니다'
            return comment
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
}

module.exports = CommunityService
