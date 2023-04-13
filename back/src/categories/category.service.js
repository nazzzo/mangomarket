class CategoryService {
    constructor({ categoryRepository, config}) {
        this.categoryRepository = categoryRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
    }
    async getList() {
        try {
            const list = await this.categoryRepository.findAll();
            if (list.length === 0) throw "내용이 없습니다";
            return list;
          } catch (e) {
            throw new this.BadRequest(e);
          }        
    }
    async getBoardCategory() {
      try {
          const result = await this.categoryRepository.findBoardCategory();
          const category = result.map(v => v.category);
          if (result.length === 0) throw "내용이 없습니다";
          return category;
        } catch (e) {
          throw new this.BadRequest(e);
        }        
  }
}
  
module.exports = CategoryService;