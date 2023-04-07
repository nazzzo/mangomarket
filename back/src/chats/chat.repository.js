class ChatRepository {
  constructor({ Chat, User, Board, Sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
  }
  async findAll(type) {
    try {
      if (type.customer) {
        const findAll = await this.Chat.findAll({ where:{ customer:`${type.customer}`}, raw: true, nest: true});
        return findAll;
      }
      else if (type.seller) {
        const findAll = await this.Chat.findAll({ where:{ seller:`${type.seller}`}, raw: true, nest: true});
        return findAll;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async postChat(data) {
    try {
      const result = await this.Chat.create(data);
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  async getUsers(data) {
    try {
      console.log(data)
      const result = await this.Chat.findAll()
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = ChatRepository;
