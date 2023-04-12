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
      const duplicateCheck = await this.Chat.findOne({ where: { content: data.content, email: null }})
      if( duplicateCheck ){
        return duplicateCheck
      } else {
        const result = await this.Chat.create(data);
        return result;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async putChat(id, content) {
    try {
      const result = await this.Chat.update({ content }, { where: { id } })
      return result
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUsers({ type, useremail }) {
    try {
      let opponent;
      type === "seller" ? (opponent = `customer`) : (opponent = `seller`);

      const sql = `SELECT 
      A.${opponent}, 
      A.boardid,
      E.subject, 
      B.username, 
      B.userImg,
      B.address,
      C.image,
      A.content,
      A.createdAt
      FROM Chat AS A
      INNER JOIN (
      SELECT 
          ${opponent}, 
          boardid, 
          MAX(createdAt) AS max_createdAt
      FROM Chat
      WHERE ${type} = "${useremail}"
      GROUP BY ${opponent}, boardid
      ) AS D ON A.${opponent} = D.${opponent} AND A.boardid = D.boardid AND A.createdAt = D.max_createdAt
      JOIN User AS B 
      ON A.${opponent} = B.email
      JOIN BoardImage AS C
      ON A.boardid = C.boardid
      JOIN Board AS E
      ON A.boardid = E.id     
      WHERE 
      C.thumbnail = 1
      ORDER BY 
      A.createdAt DESC;`;
      const result = await this.sequelize.query(sql, { raw: true, nest: true });
      return result
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ChatRepository;
