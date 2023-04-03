class AuthController {
  constructor({ authService, mailer }) {
    this.authService = authService;
    this.mailer = mailer;
  }

  async postLogin(req, res, next) {
    try {
      const { email, userpw } = req.body;
      const [token, user] = await this.authService.token({ email, userpw });
      if (token) {
        res.cookie("token", token, { maxAge : 60_000, path : "/", secure: true, sameSite: "lax", domain: "cha1rey.shop" });
        res.status(200).json(user);
      }
    } catch (e) {
      next(e);
    }
  }

  async postSns(req, res, next) {
    try {
      const result = await this.authService.tokenDecode(req.body);
      res.status(200).json(result);
    } catch (e) {
      next(e)
    }
  }

  async postFindpw(req, res, next){
    try {
      const { email } = req.body.data;
      const tempPw = Math.random().toString(36).slice(-6);
      let emailParams = {
        toEmail: email,
        subject: "임시 비밀번호 안내",
        text: `임시 비밀번호는 ${tempPw} 입니다.`
      };
      
      this.mailer.sendGmail(emailParams);

      const result = await this.authService.updateTempPw({ tempPw, email })

      if( result !== 0 ) throw "이메일 전송에 실패하였습니다."
      res.status(200).send("이메일이 전송되었습니다.");
    } catch (e) {
      next(e)
    }
  }
}

module.exports = AuthController;
