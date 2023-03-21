class BadRequest extends Error {
    constructor (message) {
        super(message)
        this.status = 501
    }
}

module.exports = BadRequest