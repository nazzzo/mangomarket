class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async postSignup(req, res, next) {
    try {
      await this.userService.signup(req.body);
      res.status(201).send("OK");
    } catch (e) {
      next(e);
    }
  }

  async putProfile(req, res, next) {
    try {
      const user = await this.userService.putProfile(req.body);
      res.json({ user });
    } catch (e) {
      next(e);
    }
  }
  
  async getMe(req, res, next) {
    try {
      if (!req.headers.authorization) throw new Error("No Authorization");
      const [type, token] = req.headers.authorization.split(" ");
      if (type.toLowerCase() !== "bearer") throw new Error("Authorization Type Error");
      const user = await this.userService.me(token);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async postUserCheck(req, res, next) {
    try {
      const user = await this.userService.putProfile(req.body);
      console.log(`controller`, user)
      res.json({user});
    } catch (e) { next(e); }
  }

  async postKeyword(req, res, next) {
    try {
      const result = await this.userService.postKeyword(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
        const result = await this.userService.deleteUser(req.params.id);
        res.json(result);
    } catch (e) {
        next(e);
    }
  }

  async getPoint(req, res, next) {
    try {
        const { email } = req.params;
        const point = await this.userService.findPoint(email);
        res.json(point);
    } catch (e) {
        next(e);
    }
  }

  async deleteKeyword(req, res, next) {
    try {
      const result = await this.userService.deleteKeyword(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
