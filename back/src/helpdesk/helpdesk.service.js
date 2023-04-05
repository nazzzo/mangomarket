class HelpDeskService {
    constructor({ helpDeskRepository, config, userRepository }) {
        this.helpDeskRepository = helpDeskRepository
        this.config = config
        this.userRepository = userRepository
    }
}

module.exports = HelpDeskService
