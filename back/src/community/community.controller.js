class CommunityController {
    constructor({ communityService }) {
      this.communityService = communityService;
    }
    async postWriting(req, res, next){
      try{
        console.log(req.body)
        const {subject, content} = req.body
        const response = await this.communityService.postWrite({
          subject,
          content,
        })
      } catch(e){
        next(e)
      }
    }
    async getList(req, res, next) {
      try {
        const response = await this.communityService.getList();
        console.log(response.data)
        res.json(response);
      } catch (e) {
        next(e);
      }
    }
    async postComment(req, res, next) {
      try {
        if (!req.body.content) throw new Error("내용이 없습니다");
        const { userid, content } = req.body;
        console.log(`req.body :`, { userid, content });
        const response = await this.communityService.postComment({
          userid,
          content,
        });
        res.status(201).json(response);
      } catch (e) {
        next(e);
      }
    }
    async putComment(req, res, next) {
      // console.log(`req.body :`, req.body)
      try {
        if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
        // console.log(`putController:`, req.params.id, req.body.content);
        const response = await this.communityService.putComment(
          req.params.id,
          req.body.content
        );
        res.status(201).json(response);
      } catch (e) {
        next(e);
      }
    }
    async deleteComment(req, res, next) {
      try {
        // if (!req.params.id) throw new Error("삭제할 댓글이 없습니다");
        const response = await this.communityService.deleteComment(req.params.id);
        res.status(201).json(response);
      } catch (e) {
        next(e);
      }
    }
  }
  
  module.exports = CommunityController;
  
    