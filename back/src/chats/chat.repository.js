class ChatRepository {
  constructor({ Chat, User, Board, Sequelize, sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
    this.sequelize = sequelize;
  }
  async findAll(type) {
    try {
      console.log(type)
      if (type.customer) {
        const findAll = await this.Chat.findAll({ where:{ customer:`${type.customer}`,seller: `${type.opponent}`, boardid: `${type.boardid}`}, raw: true, nest: true});
        return findAll;
      }
      else if (type.seller) {
        const findAll = await this.Chat.findAll({ where:{ seller:`${type.seller}`,customer: `${type.opponent}`, boardid: `${type.boardid}`}, raw: true, nest: true});
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

  async getUsers({ type, useremail }) {
    try {
      let column
      console.log(type) // seller ? customer
      console.log(useremail)
      type === "seller" ? column = `A.customer` : column = `A.seller`

      const sql = `SELECT 
      ${column}, 
      A.boardid, 
      B.username, 
      B.userImg,
      B.address
      FROM 
      Chat as A 
      JOIN User as B 
          ON A.seller = B.email 
      WHERE 
      A.${type} = "${useremail}"
      GROUP BY 
      ${column}, 
      A.boardid, 
      B.username, 
      B.userImg,
      B.address;`
      const result = await this.sequelize.query(sql, { raw: true, nest: true })
      return result
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ChatRepository;
