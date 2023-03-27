class CategoryRepository {
  constructor({ Category, BoardCategory }) {
    this.Category = Category;
    this.BoardCategory = BoardCategory;
  }
  async findAll() {
    try {
      const findAll = await this.Category.findAll();
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }
  async findBoardCategory() {
    try {
      const findAll = await this.BoardCategory.findAll();
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CategoryRepository;
