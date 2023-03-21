class CommentRepository {
    constructor({ Comment }) {
      this.Comment = Comment;
    }
    async findAll() {
      try {
        const findAll = await this.Comment.findAll({
          order: [["id", "DESC"]],
        });
        return findAll;
      } catch (e) {
        throw new Error(e);
      }
    }
    async create(commentData) {
      try {
        const create = await this.Comment.create(commentData);
        console.log(create);
        return create;
      } catch (e) {
        throw new Error(e);
      }
    }
    async update({ id, content }) {
      try {
        const update = await this.Comment.update(
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
        const destroy = await this.Comment.destroy({
          where: { id: id },
        });
        return destroy;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  
  module.exports = CommentRepository;