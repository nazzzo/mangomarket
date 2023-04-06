class HelpDeskController {
    constructor({ helpdeskService }) {
        this.helpDeskService = helpdeskService
    }

    async getList(req, res, next) {
        try {
            const { username } = req.body
            console.log('ajsfhfjkahdskjh', username)
            if (username === 'admin') throw new Error()

            const response = await this.helpDeskService.getList()
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getListOne(req, res, next) {
        try {
            console.log('getListOne :::')
            const { id } = req.params
            const response = await this.helpDeskService.getView(id)
            // console.log(`response:::`, response);
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async postAnswerOne(req, res, next) {
        try {
            const { answer } = req.body
            const { id } = req.params
            console.log('controller ::: ', req.body)
            console.log('postAnswerOne ::', answer)
            console.log('postAnswerOne ::', id)

            const response = await this.helpDeskService.postAnswer({
                answer,
                id,
            })
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    async postReport(req, res, next) {
        if (req.body.pageState === '신고하기') {
            try {
                const { content, subject, pageState } = req.body
                console.log('controller ::: ', req.body)
                if (!content) throw new Error('내용을 입력해주세요')
                if (!subject) throw new Error('내용을 입력해주세요')
                const response = await this.helpDeskService.postHelpDesk({
                    content,
                    subject,
                    pageState,
                })
                res.status(201).json(response)
            } catch (error) {
                next(error)
            }
        } else {
            try {
                const { name, email, message, pageState } = req.body
                console.log(':::', name, email, message, pageState)
                const response = await this.helpDeskService.postWrite({
                    message,
                    name,
                    pageState,
                    email,
                })
                res.status(201).json(response)
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = HelpDeskController
