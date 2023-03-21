class CategoryController {
  constructor({ categoryService }) {
    this.categoryService = categoryService;
  }
  async getList(req, res, next) {
    try {
      const response = await this.categoryService.getList();
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoryController;
