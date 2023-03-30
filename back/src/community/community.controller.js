class CommunityController {
    constructor({ communityService }) {
        this.communityService = communityService
    }

    async getComment(req, res, next){
        try{
            const {id, idx} = req.params
            console.log(req.params)
            const response = await this.communityService.getComment({id, idx})
            res.json(response)
        } catch(e){
            next(e)
        }
    }


    async postComment(req, res, next){
        try{
            const {id} = req.params
            const {content} = req.body
            const response = await this.communityService.postComment({id, content})
            res.json(response)
        } catch(e){
            next(e)
        }
    }
    
    async getWriting(req, res, next){
        try{
            
            const {id} = req.params
            console.log("getWriting :::",id)
            const response = await this.communityService.getWriting({id})
            res.json(response)
        } catch(e) {
            next(e)
        }
    }

    async getList(req, res, next) {
        // console.log('getList::')
        try {
            const response = await this.communityService.getList()
            // console.log(response)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }
    // async getView(req, res, next) {
    //     try {
    //         const boardId = req.params
    //         console.log('controller ::', boardId)
    //         const response = await this.communityService.getView({ boardId })
    //         console.log('response data ::: ', response.data)
    //         res.json(response)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    async postCommunity(req, res, next) {
        console.log('req.body:::', req.body)
        try {
            if (!req.body.content) throw new Error('내용이 없습니다')
            const { email, content, subject } = req.body
            console.log(`req.body :`, { email, content, subject })
            const response = await this.communityService.postCommunity({
                email,
                content,
                subject,
            })
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
    async putComment(req, res, next) {
        // console.log(`req.body :`, req.body)
        try {
            if (!req.body.content) throw new Error('수정할 내용을 입력해주세요')
            // console.log(`putController:`, req.params.id, req.body.content);
            const response = await this.communityService.putComment(req.params.id, req.body.content)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
    async deleteComment(req, res, next) {
        try {
            // if (!req.params.id) throw new Error("삭제할 댓글이 없습니다");
            const response = await this.communityService.deleteComment(req.params.id)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = CommunityController
