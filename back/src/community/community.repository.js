class CommunityRepository {
    constructor({ Community }) {
      this.Community = Community;
    }
    async createWriting({subject, content}){
      try {
        const create = await this.Community.create({subject, content})
        return create
      } catch (e){
        throw new Error(e)
      }
    }
    async findAll() {
      try {
        const findAll = await this.Community.findAll({
          order: [["id", "DESC"]],
        });
        return findAll;
      } catch (e) {
        throw new Error(e);
      }
    }
    async create(commentData) {
      try {
        const create = await this.Community.create(commentData);
        console.log(create);
        return create;
      } catch (e) {
        throw new Error(e);
      }
    }
    async update({ id, content }) {
      try {
        const update = await this.Community.update(
          { content: content },
          { where: { id: id } }
        );
        return update;
      } catch (e) {
        throw new Error(e);
      }
    }
    async destroy(id) {
      console.log("repo :", id);
      try {
        const destroy = await this.Community.destroy({
          where: { id: id },
        });
        return destroy;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  
  module.exports = CommunityRepository;