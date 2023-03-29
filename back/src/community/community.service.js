class CommunityService {
    constructor({ communityRepository, config }) {
      this.communityRepository = communityRepository;
      this.config = config;
      this.BadRequest = config.exception.BadRequest;
    }
    async postWrite({subject, content}){
      try{
        const writing = await this.communityRepository.createWriting({subject, content})
        return writing
      } catch(e){
        throw new this.BadRequest(e)
      }
    }
    async getList() {
      try {
        const list = await this.communityRepository.findAll();
        if (list.length === 0) throw "내용이 없습니다";
        return list;
      } catch (e) {
        throw new this.BadRequest(e);
      }
    }
    async postComment({ userid, content }) {
      console.log(`serv :`, { userid, content });
      try {
        if (!userid || !content) throw "내용이 없습니다";
        const comment = await this.communityRepository.create({ userid, content });
        return comment;
      } catch (e) {
        throw new this.BadRequest(e);
      }
    }
    async putComment(id, content) {
      // console.log(`serv :`, { id, content });
      try {
        const comment = await this.communityRepository.update({ id, content });
        if (comment < 1) throw "수정할 댓글이 없습니다";
        return comment;
      } catch (e) {
        throw new this.BadRequest(e);
      }
    }
    async deleteComment(id) {
      // console.log(`serv :`, id);
      try {
        const comment = await this.communityRepository.destroy(id);
        if (comment < 1) throw "삭제할 댓글이 없습니다";
        return comment;
      } catch (e) {
        throw new this.BadRequest(e);
      }
    }
  }
  
  module.exports = CommunityService;
  