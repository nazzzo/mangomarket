class TempController {
    constructor({ tempService }) {
        this.tempService = tempService
    }

    async getTempData(req, res, next) {
        try {
            console.log('getTempData :::', req.query)
            const { email } = req.query

            const response = await this.tempService.getTempInfo({ email })
            console.log(response)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async postTempData(req, res, next) {
        try {
            const { id } = req.query
            const { content, subject } = req.body
            console.log('tempData ::: controller ::: ', req.query)
            const response = await this.tempService.postTempWrite({ id, content, subject })
            console.log(response)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = TempController
