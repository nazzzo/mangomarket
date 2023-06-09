class CommunityController {
    constructor({ communityService }) {
        this.communityService = communityService
    }

    async postComment(req, res, next) {
        try {
            console.log('body::', req.body)
            const { id } = req.params
            const { content, email } = req.body
            if (!content) throw new Error('내용을 입력해주세요')
            const response = await this.communityService.postComment({ id, content, email })
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getWriting(req, res, next) {
        try {
            const { id } = req.params
            const response = await this.communityService.getWriting({ id })
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getWriting(req, res, next) {
        try {
            const { id } = req.params
            const response = await this.communityService.getWriting({ id })
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getList(req, res, next) {
        try {
            const response = await this.communityService.getList()
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async postCommunity(req, res, next) {
        console.log('req.body:::', req.body)
        try {
            if (!req.body.content) throw new Error('내용이 없습니다')
            if (!req.body.category) throw new Error('카테고리를 선택해주세요')
            if (!req.body.subject) throw new Error('제목을 입력해주세요')
            const { email, content, subject, category } = req.body
            const response = await this.communityService.postCommunity({
                email,
                content,
                subject,
                category,
            })
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async putCommunity(req, res, next) {
        console.log(`req.body :`, req.body)
        try {
            if (!req.body.subject || !req.body.content)
                throw new Error('수정할 내용을 입력해주세요')
            const response = await this.communityService.putCommunity(
                req.params.id,
                req.body.content,
                req.body.subject
            )
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async putComment(req, res, next) {
        console.log(`req.body :`, req.params, req.body)
        try {
            if (!req.body.content) throw new Error('수정할 내용을 입력해주세요')
            // console.log(`putController:`, req.params.id, req.body.content);
            const response = await this.communityService.putComment(
                req.params.id,
                req.params.idx,
                req.body.content
            )
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async deleteCommunity(req, res, next) {
        try {
            // if (!req.params.id) throw new Error("삭제할 댓글이 없습니다");
            console.log('req.params.id', req.params.id)
            const response = await this.communityService.deleteCommunity(req.params.id)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async deleteComment(req, res, next) {
        try {
            // if (!req.params.id) throw new Error("삭제할 댓글이 없습니다");
            console.log(req.params.id, req.params.idx)
            const response = await this.communityService.deleteComment(
                req.params.id,
                req.params.idx
            )

            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = CommunityController
