class UserRepository {
  constructor({ sequelize, User, PointUp }) {
      this.User = User;
      this.PointUp = PointUp;
      this.sequelize = sequelize;
  }

  async addUser(payload) {
      console.log(`payload::::`, payload);
      try {
          const user = await this.User.create(payload, { raw: true });
          return user;
      } catch (e) {
          throw new Error(e);
      }
  }
  async findUser(user) {
      const key = Object.keys(user);
      // console.log(user[key]);
      try {
          const userCheck = await this.User.findOne({
              raw: true,
              where: {
                  [key]: user[key],
              },
          });
          return userCheck;
      } catch (e) {
          throw new Error(e);
      }
  }
  async getUserById(email) {
      console.log(`repo:`, email);
      try {
          const user = await this.User.findOne({
              raw: true,
              where: {
                  email,
              },
          });
          return user;
      } catch (e) {
          throw new Error(e);
      }
  }

  async updateProfile(userData) {
      try {
          console.log(`repo userData : `, userData);
          const result = await this.User.update(userData, {
              where: { email: userData.email },
              returning: true,
          });
          console.log(`repo2 : `, result[1]);
          return result[1];
      } catch (e) {
          throw new Error(e);
      }
  }
  async destroyUser(userid) {
      console.log(`deleting user:::`, userid);
      try {
          const destroy = await this.User.destroy({
              where: { userid: userid },
          });
          return destroy;
      } catch (e) {
          throw new Error(e);
      }
  }

  async findPoint(userid) {
      console.log(userid);
      try {
          const sql = `SELECT A.id, A.userid, A.boardid, A.comment, A.commentid, A.createdAt, B.subject, C.Content FROM PointUp AS A JOIN Board AS B ON A.boardid = B.id LEFT JOIN Comment AS C ON A.commentid = C.id WHERE A.userid = '${userid}' ORDER BY A.createdAt DESC;`;
          const sql2 = `SELECT 
          userid, 
          (select count(*) from PointUp where commentid is null and userid=a.userid) as boardCount, 
          COUNT(commentid) AS commentCount 
      FROM PointUp as a
      WHERE userid = '${userid}'
      `;
          const [chart] = await this.sequelize.query(sql);
          const [[sum]] = await this.sequelize.query(sql2);
          const data = { chart, sum };
          return data;
      } catch (e) {
          throw new Error(e);
      }
  }
}

module.exports = UserRepository;

