class ChatService {
    constructor({ chatRepository, config}) {
        this.chatRepository = chatRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
    }
    async getList(type) {
        try {
            const list = await this.chatRepository.findAll(type);
            if (list.length === 0) throw "내용이 없습니다";
            return list;
          } catch (e) {
            throw new this.BadRequest(e);
          }        
    }
}
  
module.exports = ChatService;