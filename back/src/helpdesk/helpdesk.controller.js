class HelpDeskController {
    constructor({ helpDeskService }) {
        this.helpDeskService = helpDeskService
    }

    async postReport() {
        try {
            const { content } = req.body
            console.log(req.body)
            if (!content) throw new Error('내용을 입력해주세요')
        } catch (error) {
            next(e)
        }
    }
}

module.exports = HelpDeskController
