class ChatController {
  constructor({ chatService }) {
    this.chatService = chatService;
  }

  async getList(req, res, next) {
    try {
      const response = await this.chatService.getList(req.query);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async postChat(req, res, next) {
    try {
      console.log(req.body)
    } catch (e) { 
      next(e)
    }
  }
}

module.exports = ChatController;
