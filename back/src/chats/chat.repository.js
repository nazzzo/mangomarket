class ChatRepository {
  constructor({ Chat, User, Board, Sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
  }
  async findAll(seller) {
    try {
      const findAll = await this.Chat.findAll({ where:{ seller:`${seller.seller}`}, raw: true, nest: true});
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }

  async postChat(data) {
    try {
      const result = await this.Chat.create(data);
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = ChatRepository;
