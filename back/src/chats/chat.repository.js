class ChatRepository {
  constructor({ Chat, User, Board, Sequelize, sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
    this.sequelize = sequelize;
  }

  async findAll(type) {
    try {
      if (type.customer) {
        const findAll = await this.Chat.findAll({
          where: {
            customer: `${type.customer}`,
            seller: `${type.opponent}`,
            boardid: `${type.boardid}`,
          },
          raw: true,
          nest: true,
        });
        return findAll;
      } else if (type.seller) {
        const findAll = await this.Chat.findAll({
          where: {
            seller: `${type.seller}`,
            customer: `${type.opponent}`,
            boardid: `${type.boardid}`,
          },
          raw: true,
          nest: true,
        });
        return findAll;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserInfo(opponent){
    try {
      console.log("abcd",opponent)
    } catch (e) {
      throw new Error(e)
    }
  }

  async postChat(data) {
    try {
      const result = await this.Chat.create(data);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUsers({ type, useremail }) {
    try {
      let column;
      type === "seller" ? (column = `customer`) : (column = `seller`);

      const sql = `SELECT 
      A.${column}, 
      A.boardid, 
      B.username, 
      B.userImg,
      B.address,
      C.image,
      A.content
      FROM Chat AS A
      INNER JOIN (
      SELECT 
          ${column}, 
          boardid, 
          MAX(createdAt) AS max_createdAt
      FROM Chat
      WHERE ${type} = "${useremail}"
      GROUP BY ${column}, boardid
      ) AS D ON A.${column} = D.${column} AND A.boardid = D.boardid AND A.createdAt = D.max_createdAt
      JOIN User AS B 
      ON A.${column} = B.email
      JOIN BoardImage AS C
      ON A.boardid = C.boardid     
      WHERE 
      C.thumbnail = 1
      ORDER BY 
      A.createdAt DESC;`;
      const result = await this.sequelize.query(sql, { raw: true, nest: true });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ChatRepository;
