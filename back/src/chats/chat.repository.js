class ChatRepository {
  constructor({ Chat, User, Board, Sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
  }
  async findAll() {
    try {
      const findAll = await this.Chat.findAll();
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ChatRepository;
