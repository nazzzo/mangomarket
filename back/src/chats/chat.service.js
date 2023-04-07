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

    async postChat(data) {
        try {
          const result = await this.chatRepository.postChat(data)
          return result
          } catch (e) {
            throw new this.BadRequest(e);
          }        
    }

    async getUsers( data ) {
      try {
        const type = Object.keys(data)[0]
        const useremail = Object.values(data)[0]
        
        const result = await this.chatRepository.getUsers( { type, useremail } )
        return result
      } catch (e) {
        throw new Error(e)
      }
    }
}
  
module.exports = ChatService;