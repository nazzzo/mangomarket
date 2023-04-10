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
      type === "seller" ? column = `customer` : column = `seller`

      const sql = `SELECT 
      A.${column}, 
      A.boardid, 
      B.username, 
      B.userImg,
      B.address,
      C.image,
      A.content,
      A.createdAt
      FROM (
        SELECT 
            ${column}, 
            boardid, 
            MAX(content) as content,
            MAX(createdAt) as createdAt
        FROM Chat 
        WHERE ${type} = "${useremail}"
        GROUP BY ${column}, boardid
      ) AS A 
      JOIN User as B 
          ON A.${column} = B.email
      JOIN BoardImage as C
          ON A.boardid = C.boardid
      WHERE
          C.thumbnail = 1     
      ORDER BY 
          A.createdAt DESC;`
      const result = await this.sequelize.query(sql, { raw: true, nest: true })
      return result
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ChatRepository;
