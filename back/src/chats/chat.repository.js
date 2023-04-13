class ChatRepository {
  constructor({ Chat, User, Board, Sequelize, sequelize }) {
    this.Chat = Chat;
    this.User = User;
    this.Board = Board;
    this.sequelize = sequelize;
  }

  async findAll({ seller, customer, boardid}) {
    try {
        const findAll = await this.Chat.findAll({
          where: { seller, customer, boardid },
          raw: true,
          nest: true,
        });
        return findAll;
    } catch (e) {
      throw new Error(e);
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
  // async postChat(data) {
  //   try {
  //       const result = await this.Chat.create(data);
  //       const result2 = await this.Chat.findAll({ where: {content: data.content}, raw: true, nest: true });
  //       console.log(result2.length)
  //       if(result2.length >= 2){
  //         // for(let i = 0; i <= result2.length - 1; i++){
  //         //   console.log("제발", result2[result2.length - 1 -i])
  //         // }
  //         const result3 = await this.Chat.destory({ where: { id: result2[result2.length - 1].id }})
  //         return result3
  //       } else {
  //         return result;
  //       }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

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
      A.${type},
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
  async getSeller(id, customer) {
    try {
      const sql = `SELECT 
      A.id AS boardid,
      A.email AS seller,
      A.subject, 
      B.username, 
      B.userImg,
      B.address,
      C.image,
      A.content,
      A.createdAt,
      '${customer}' AS customer
      FROM Board AS A
      JOIN User AS B 
      ON A.email = B.email
      JOIN BoardImage AS C
      ON A.id = C.boardid
      WHERE 
      C.thumbnail = 1
      AND A.id = ${id}
      `
      const [result] = await this.sequelize.query(sql, { raw: true, nest: true });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ChatRepository;
