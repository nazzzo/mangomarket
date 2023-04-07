class ChatRepository {
  constructor({ Chat, User, Board, Sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
  }
  async findAll(seller) {
    try {
      console.log("rep", seller.seller)
      const findAll = await this.Chat.findAll({ where:{ seller:`${seller.seller}`}, raw: true, nest: true});
      console.log(findAll)
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }

  async postChat(data) {
    try {
      console.log(data)
      const result = await this.Chat.create(data);
      console.log(result)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = ChatRepository;
