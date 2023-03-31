class UserService {
  constructor({ userRepository, jwt, config }) {
      this.userRepository = userRepository;
      this.jwt = jwt;
      this.BadRequest = config.exception.BadRequest;
      this.crypto = jwt.crypto;
      this.config = config;
      this.salt = config.salt
  }

  async signup(userData) {
      try {
          userData.address = `${userData.address} ${userData.detailAddress}`;
          if (!userData.userImg) userData.userImg = `http://${this.config.host}:${this.config.imgport}/default-image.png`
          const { email, username, userpw, ...rest } = userData;
          if (!email || !userpw || !username) throw "내용이 없습니다";
          const hash = this.crypto.createHmac("sha256", this.salt).update(userpw).digest("hex");
          const user = await this.userRepository.addUser({
              email,
              username,
              userpw: hash,
              ...rest,
          });
          return user;
      } catch (e) {
          throw new this.BadRequest(e);
      }
  }

  async userCheck(user) {
      // console.log(`serv :`, user)
      try {
          const userCheck = await this.userRepository.findUser(user);
          return userCheck;
      } catch (e) {
          throw new Error(e);
      }
  }

  async me(token) {
      try {
          const { userid } = this.jwt.verifyToken(token, this.salt);
          const user = await this.userRepository.getUserById(userid);
          // console.log(user)
          return user;
      } catch (e) {
          throw new Error(e);
      }
  }

  async putProfile(userData) {
      try {
          console.log(`userData ::::`, userData);
          if (!userData.userImg) userData.userImg = `${config.PT}://${this.config.host}:${this.config.imgport}/default-image.png`
        //   const { userpw, ...rest } = userData;

        //   const hash = this.crypto.createHmac("sha256", this.salt).update(userpw).digest("hex");

          const updatedUser = await this.userRepository.updateProfile(userData);
          if (updatedUser === 1) {
            //   console.log(`user :::::::`, 1);
              const { email, userImg, username } = await this.userRepository.getUserById(userData.email);
            //   const token = this.jwt.createToken(modified);
            //   console.log(`token :::::::`, token);
            return { email, userImg, username };
          } else {
              const error = new Error("수정 실패");
              error.status = 401;
              throw error;
          }
      } catch (e) {
          throw new Error(e);
      }
  }
  async deleteUser(user) {
      try {
          console.log(`user :::::`, user);
          const drop = await this.userRepository.destroyUser(user);
          return drop;
      } catch (e) {
          throw new Error(e);
      }
  }

  async findPoint(email) {
      try {
          const point = await this.userRepository.findPoint(email);
          return point;
      } catch (e) {
          throw new this.BadRequest(e);
      }
  }
}

module.exports = UserService;

