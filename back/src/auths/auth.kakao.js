const { host, port, redirect_host, redirect_port } = require("../../config");
class Kakao {
  constructor({ axios, qs, jwt, User }) {
    this.axios = axios;
    this.qs = qs;
    this.User = User;
    this.jwt = jwt;
    this.KKO_HOST = `https://kauth.kakao.com`;
    this.REST_API_KEY = `1fe7ae4bf45bdf9bd6fc758bd63e9e0f`;
    this.REDIRECT_URI = `http://${host}:${port}/auths/kakao`;
    this.CLIENT_SERCRET = `1NLiTnJ7OOm09XyI4PrGAgIPwKispRor`;
  }

  async getToken(code) {
    const headers = {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    const host = `${this.KKO_HOST}/oauth/token`;
    const body = this.qs.stringify({
      grant_type: "authorization_code",
      client_id: this.REST_API_KEY,
      redirect_uri: this.REDIRECT_URI,
      code,
      client_secret: this.CLIENT_SERCRET,
    });
    const { data } = await this.axios.post(host, body, headers)
    return data;
  } 

  async kakaoSignup({ data }) {
    console.log(`data::::`, data)
    const payload = {
      email: data.kakao_account.email,
      userpw: this.jwt.crypto
        .createHmac("sha256", this.jwt.config.salt)
        .update(`${data.kakao_account.email}`)
        .digest("hex"),
      username: data.kakao_account.profile.nickname,
      userImg: data.kakao_account.profile.profile_image_url,
      provider: "kakao",
    };
    console.log(`payload::::`, payload);
    const [me] = await this.User.findOrCreate({ raw: true, where: payload });
    console.log(`me::::`, me);
    return me;
  }

  async me({ email }) {
    const user = await this.User.findOne({
      raw: true,
      attribute: {
        exclude: ["userpw"],
      },
      where: {
        email,
      },
    });

    return user;
  }

  async login(req, res, next) {
    try {
      const { code } = req.query;
      const { access_token } = await this.getToken(code);
      const host = `https://kapi.kakao.com/v2/user/me`;
      const { data } = await this.axios.post(host, null, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user = await this.kakaoSignup({ data });
      console.log(`user:::`, user);
      res.cookie("token", this.jwt.createToken(user), { maxAge : 60_000, path : "/", secure: true });
      res.redirect(`http://${redirect_host}:${redirect_port}`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Kakao;
