class HelpDeskRepository {
    constructor({ HelpDesk, Community, sequelize, User, Comment }) {
        this.HelpDesk = HelpDesk
        this.Community = Community
        this.sequelize = sequelize
        this.User = User
        this.Comment = Comment
    }
}

module.exports = HelpDeskRepository
