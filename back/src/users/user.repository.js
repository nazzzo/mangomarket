class UserRepository {
    constructor({ sequelize, User, PointUp, Keyword, }) {
        this.User = User;
        this.PointUp = PointUp;
        this.Keyword = Keyword;
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
    async addUser(payload) {
        try {
            const user = await this.User.create(payload, { raw: true });
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findUser(user) {
        try {
            const key = Object.keys(user);
            const userCheck = await this.User.findOne({ raw: true, where: { [key]: user[key] }});
            return userCheck;
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

  async findPoint(email) {
      try {
          const sql = `SELECT 
          A.id, 
          A.email, 
          A.boardid,
          A.soldid, 
          A.community, 
          A.communityid, 
          A.createdAt, 
          B.subject, 
          C.Content 
          FROM PointUp AS A 
          JOIN Board AS B ON A.boardid = B.id 
          LEFT JOIN Community AS C ON A.communityid = C.id 
          WHERE A.email = '${email}' ORDER BY A.createdAt DESC;`;
          const sql2 = `SELECT 
          email, 
          (select count(*) from PointUp where communityid is null and email=a.email) as boardCount,
          COUNT(soldid) AS soldCount, 
          COUNT(communityid) AS communityCount 
      FROM PointUp as a
      WHERE email = '${email}'
      `;
          const [chart] = await this.sequelize.query(sql);
          const [[sum]] = await this.sequelize.query(sql2);
          const data = { chart, sum };
          return data;
      } catch (e) {
          throw new Error(e);
      }
  }
  async addKeyword(payload) {
    try {
        const user = await this.Keyword.create(payload, { raw: true });
        return user;
    } catch (e) {
        throw new Error(e);
        }
    }

    async getUserById(email) {
        try {
            const user = await this.User.findOne({ raw: true, where: { email } });
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateProfile(userData) {
        try {
            const result = await this.User.update(userData, { where: { email: userData.email }, returning: true })[1];
            return result
        } catch (e) {
            throw new Error(e);
        }
    }

    async destroyUser(userid) {
        try {
            const destroy = await this.User.destroy({ where: { userid: userid } });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findPoint(email) {
        try {
            const sql = `SELECT 
            A.id, 
            A.email, 
            A.boardid,
            A.soldid, 
            A.community, 
            A.communityid, 
            A.createdAt, 
            B.subject, 
            C.Content 
            FROM PointUp AS A 
            JOIN Board AS B ON A.boardid = B.id 
            LEFT JOIN Community AS C ON A.communityid = C.id 
            WHERE A.email = '${email}' ORDER BY A.createdAt DESC;`;
            const sql2 = `SELECT 
            email, 
            (select count(*) from PointUp where communityid is null and email=a.email) as boardCount,
            COUNT(soldid) AS soldCount, 
            COUNT(communityid) AS communityCount 
        FROM PointUp as a
        WHERE email = '${email}'
        `;
            const [chart] = await this.sequelize.query(sql);
            const [[sum]] = await this.sequelize.query(sql2);
            const data = { chart, sum };
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
    async addKeyword(payload) {
        try {
            const user = await this.Keyword.create(payload, { raw: true });
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async destroyKeyword(payload) {
        try {
            const user = await this.Keyword.destroy({ where: { email: payload.email, keyword: payload.keyword } });
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserRepository;

