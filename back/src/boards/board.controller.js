class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService;
    }

    async getList(req, res, next) {
        try {
            const response = await this.boardService.getList(req.body, req.query);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async getView(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.boardService.getView(id);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async attention(req, res, next) {
        try {
            const { userid } = req.params;
            const response = await this.boardService.profile(userid);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
        
    async getKeywords(req, res, next) {
        try {
            const response = await this.boardService.getKeywords(req.query.id, req.query.email);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    async postWrite(req, res, next) {
        try {
            if (!req.body.subject) throw new Error("제목이 없습니다");
            if (!req.body.content) throw new Error("내용이 없습니다");
            const { email, subject, content, hashtag, category, images, thumbnail } = req.body;
            const response = await this.boardService.postWrite({email, subject, content, category, hashtag, images, thumbnail });
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    async postLike(req, res, next) {
        console.log(`postCon:`, req.params.id, req.body);
        try {
            const [count, check] = await this.boardService.postLike(req.params.id, req.body.email);
            console.log(count, check)
            res.status(201).json({ count, check });
        } catch (e) {
            next(e);
        }
    }
    
    async getcheck(req, res, next) {
        try {
            const { id: userid, idx: boardid } = req.params;
            const data = await this.boardService.likechecked({ userid, boardid });
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    // async putView(req, res, next) {
    //     try {
    //         const putdata = req.body;
    //         const data = { id: req.params.idx, ...putdata };
    //         if (!req.body.subject) throw new Error("제목을 입력해주세요");
    //         if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
    //         const view = await this.boardService.putView(data);
    //         res.status(201).json(view);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    
    // async deleteView(req, res, next) {
    //     try {
    //         // if (!req.params.id) throw new Error("삭제할 글이 없습니다");
    //         const response = await this.boardService.deleteView(req.params.idx);
    //         res.status(201).json(response);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = BoardController;

