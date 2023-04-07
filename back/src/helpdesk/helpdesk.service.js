class HelpDeskService {
    constructor({ helpdeskRepository, config, userRepository }) {
        this.helpDeskRepository = helpdeskRepository
        this.config = config
        this.userRepository = userRepository
    }

    async postHelpDesk({ content, subject, pageState, email }) {
        try {
            console.log('Service content,subject', content, subject, pageState, email)
            if (!subject || !content) throw '내용이 없습니다'
            const response = await this.helpDeskRepository.create({
                content,
                subject,
                pageState,
                email,
            })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async postAnswer({ answer, id }) {
        try {
            console.log('Service answer :: ', answer, id)
            const response = await this.helpDeskRepository.answer({ answer, id })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async postWrite({ name, message, pageState, email }) {
        try {
            if (!message || !email || !name) throw '내용을 입력해주세요'
            const response = await this.helpDeskRepository.createWrite({
                name,
                message,
                pageState,
                email,
            })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async getList() {
        try {
            const [list] = await this.helpDeskRepository.findAll()
            if (list.length === 0) throw '내용이 없습니다'

            // list.map((v) => v.createdAt.split('T')[0])
            console.log('list ::', list)
            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }

    async getProfileList({ email }) {
        try {
            console.log('getProfileList ::: ', email)

            const list = await this.helpDeskRepository.findProfilListAll({ email })

            return list
        } catch (e) {
            throw new this.BadRequest(e)
        }
    }
    async getView(id) {
        try {
            console.log('view ::: ', id)
            const [view] = await this.helpDeskRepository.findOne(id)
            console.log(view)
            return view
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = HelpDeskService
