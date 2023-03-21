class CategoryRepository {
  constructor({ Category }) {
    this.Category = Category;
  }
  async findAll() {
    try {
      const findAll = await this.Category.findAll();
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CategoryRepository;
