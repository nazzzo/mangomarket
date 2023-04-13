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
      const result = await this.chatService.postChat(req.body.data)
      res.status(201).json(result)
    } catch (e) { 
      next(e)
    }
  }

  async putChat(req, res, next) {
    try {
      const { id } = req.params
      const { content } = req.body
      const result = await this.chatService.putChat(id, content)
      res.status(201).json(result)
    } catch (e) { 
      next(e)
    }
  }

  async getCustomers (req, res, next) {
    try {
      const result = await this.chatService.getUsers(req.query)
      res.status(201).json(result)
    } catch (e) {
      throw new this.BadRequest(e)
    }
  }

  async getSellers (req, res, next) {
    try {
      const result = await this.chatService.getUsers(req.query)
      res.status(201).json(result)
    } catch (e) {
      throw new this.BadRequest(e)
    }
  }
  async getSeller (req, res, next) {
    try {
      const result = await this.chatService.getSeller(req.params, req.query)
      res.status(201).json(result)
    } catch (e) {
      throw new this.BadRequest(e)
    }
  }
  async getState (req, res, next) {
    try {
      const result = await this.chatService.getState(req.params)
      res.status(201).json(result)
    } catch (e) {
      throw new this.BadRequest(e)
    }
  }
}

module.exports = ChatController;
