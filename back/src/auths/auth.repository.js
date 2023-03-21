class AuthRepository {
  constructor({ User }) {
    this.User = User;
  }
  async getUserByInfo({ email, userpw }) {
    try {
        const user = await this.User.findOne({
            raw: true,
            attributes: { exclude: ["userpw"]},
            where: {
                email,
                userpw
            }
        })
        return user
    } catch (e) {
      throw new Error(e);
    }
  }
}
module.exports = AuthRepository;
