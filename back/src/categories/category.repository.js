class CategoryRepository {
  constructor({ Category, BoardCategory }) {
    this.Category = Category;
    this.BoardCategory = BoardCategory;
  }
  async findAll() {
    try {
      const result = await this.Category.findAll();
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
  async findBoardCategory() {
    try {
      const result = await this.BoardCategory.findAll({ raw: true, order: [['id', 'ASC']] });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CategoryRepository;
