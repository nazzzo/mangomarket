class AuthService {
  constructor({ authRepository, jwt, config }) {
    this.authRepository = authRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    this.salt = config.salt
    this.BadRequest = config.exception.BadRequest
  }
  
  async token({ userid, userpw }) {
    console.log(userid, userpw)
    try {
      if (!userid || !userpw) throw "사용자가 없습니다";
      const hash = this.crypto.createHmac("sha256", this.salt).update(userpw).digest("hex");
      const user = await this.authRepository.getUserByInfo({
        userid,
        userpw: hash,
      });
      if (!user) throw "아이디와 패스워드가 일치하지 않습니다";

      console.log(`serv :`, user)
      const token = this.jwt.createToken(user)
      return [token, user];
    } catch (e) {
      throw new this.BadRequest(e);
    }
  }
}

module.exports = AuthService;