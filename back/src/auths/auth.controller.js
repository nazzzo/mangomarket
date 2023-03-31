class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }
  async postLogin(req, res, next) {
    console.log(req.body);
    try {
      const { email, userpw } = req.body;
      const [token, user] = await this.authService.token({ email, userpw });
      if (token) {
        res.cookie("token", token, { maxAge : 60_000, path : "/", secure: true });
        res.status(200).json(user);
      }
    } catch (e) {
      next(e);
    }
  }
  async postSns(req, res, next) {
    const result = await this.authService.tokenDecode(req.body)
    res.status(200).json(result)
  }
}

module.exports = AuthController;
