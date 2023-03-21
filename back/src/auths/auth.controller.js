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
        res.cookie("token", token, { maxAge : 60_000, path : "/" });
        res.status(200).json(user);
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
