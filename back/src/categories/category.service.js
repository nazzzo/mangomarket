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
}
  
module.exports = CategoryService;