class TempService {
    constructor({ tempRepository }) {
        this.tempRepository = tempRepository
    }

    async getTempInfo({ email }) {
        try {
            const [tempData] = await this.tempRepository.findTemp({ email })
            console.log('tempData Service ::', tempData)
            return tempData
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async postTempWrite({ id, content, subject }) {
        try {
            console.log('community Service Temp data :', id, content, subject)
            const temp = await this.tempRepository.tempDataCreate({ id, content, subject })
            console.log('community Service Temp data temp:', temp)
            return temp
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
}

module.exports = TempService
