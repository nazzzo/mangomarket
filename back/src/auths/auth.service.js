class AuthService {
  constructor({ userRepository, authRepository, jwt, config }) {
    this.userRepository = userRepository.userRepository;
    this.authRepository = authRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    this.salt = config.salt
    this.BadRequest = config.exception.BadRequest
  }
  
  async token({ email, userpw }) {
    try {
      if (!email || !userpw) throw "사용자가 없습니다";

      const hash = this.crypto.createHmac("sha256", this.salt).update(userpw).digest("hex");
      const user = await this.authRepository.getUserByInfo({ email, userpw: hash });

      if (!user) throw "아이디와 패스워드가 일치하지 않습니다";

      const token = this.jwt.createToken(user)

      return [token, user];
    } catch (e) {
      throw new this.BadRequest(e);
    }
  }
  async tokenDecode({token}) {
    try {
      const [header, payload, signature] = token.split(".")
      const userInfo = this.jwt.decode(payload)
      return userInfo
    } catch (e) {
      next(e)
    }
    
  }

  async updateTempPw({ tempPw, email }){
    try {
      const hash = this.crypto
      .createHmac("sha256", this.salt)
      .update(tempPw)
      .digest("hex");

      const updateData = { 
          email,
          userpw: hash
      }

      const result = await this.userRepository.updateProfile(updateData)
      return result
    } catch (e) {
      next(e)
    }
  }
}

module.exports = AuthService;