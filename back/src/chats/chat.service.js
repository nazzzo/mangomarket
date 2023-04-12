class ChatService {
    constructor({ chatRepository, config}) {
        this.chatRepository = chatRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
    }
    
    async getList(type) {
        try {
            const { opponent } = type
            const list = await this.chatRepository.findAll(type);
            const userInfo = await this.chatRepository.findUserInfo(opponent)
            if (list.length === 0) throw "내용이 없습니다";
            return list;
          } catch (e) {
            throw new this.BadRequest(e);
          }        
    }

    async postChat(data) {
        try {
          const { seller, customer, boardid, content, email } = data

          const result = await this.chatRepository.postChat({ seller, customer, boardid, content, email })
          return result
          } catch (e) {
            throw new this.BadRequest(e);
          }        
    }

    async putChat(id, content) {
        try {
          const result = await this.chatRepository.putChat(id, content)
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