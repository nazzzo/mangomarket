class BoardService {
    constructor({ boardRepository, userRepository, config, jwt }) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
        this.jwt = jwt;
        this.viewObj = new Object();
    }

    async getList({ sort, category }, { count, searchType, search, email, sort: pagingsort, category: pagingcategory, distance }) {
        try {
            const views = 6;
            let limitval = views * count;
            const limit = { limit: limitval, views };

            if (category === `default`) category = ``;
            if (searchType === "email") searchType = "A.email";
            if (search === "undefined") search = "";
            if (!searchType && search) searchType = "A.subject";
            if (!count || Number(count) === 1) limitval = views;
            if (distance === "undefined") distance = 2.5
            else if (!distance) distance = 10

            const data = await this.boardRepository.findAll({ searchType, search, email, sort, category, limit, pagingsort, pagingcategory, distance });
            return data;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async getView(id) {
        try {
            const view = await this.boardRepository.findOne(id)
            return view
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async profile(userid) {
        try {
            const [[response]] = await this.boardRepository.getMyAttention(userid);
            return response;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async getKeywords(keywordId, email) {
        try {
            if (!keywordId) throw "알림 키워드가 없습니다";
            const boardIds = await this.boardRepository.getKeywordId(keywordId);
            const boards = await Promise.all(
                boardIds.map(async ({ boardId }) => await this.boardRepository.findOne(boardId))
            );
            const filtered = boards.filter(board => board.email !== email);
            return filtered;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postWrite({ email, subject, content, hashtag, category, images, thumbnail }) {
        try {
            if (!email || !subject || !content) throw "내용이 없습니다";
            const { username } = await this.userRepository.getUserById(email)
            const boarddata = { email, subject, content, hashtag, category }
            const write = await this.boardRepository.createBoard(boarddata)
            write.username = username
            const arr = []
            images.map((v, index) => {
                const obj = {}
                arr[index] = obj
                arr[index].image = v
                thumbnail === index ? arr[index].thumbnail = true : arr[index].thumbnail = false
                arr[index].boardid = write.id
            })
            await this.boardRepository.uploadImage(arr)
            if (write) await this.boardRepository.createPoint({email: write.email, boardid: write.id});
            return write;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postLike(boardid, email) {
        try {
            if (!boardid || !email) throw "추천 실패";
            const [count, check] = await this.boardRepository.createLike({ boardid, email });
            return [count, check];
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    
    async likechecked({ userid, boardid }) {
        try {
            const checkdata = this.boardRepository.likecheck({ userid, boardid });
            return checkdata;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async putView(putdata) {
        try {
            const { id, subject, content, hashtag, category, userid } = putdata;
            if (id === "temp") {
                if (!userid || !subject || !content) throw "내용이 없습니다";
                const imgs = content.split("img src=").filter((v) => v.indexOf("http") !== -1).map((v) => v.split("&gt")[0]);
                const boarddata = { userid, subject, content, hashtag, category, image: imgs[0] };

                if (!imgs[0]) delete boarddata.image;
                const view = await this.boardRepository.createBoard(boarddata);
                await this.boardRepository.tempDestroy(userid);
                return view;
            } else {
                const view = await this.boardRepository.updateBoard({ id, subject, content, hashtag, category });
                if (view < 1) throw "수정할 게시글이 없습니다";
                return view;
            }
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async deleteView(idx) {
        try {
            const view = await this.boardRepository.destroyBoard(idx);
            if (view < 1) throw "삭제할 게시글이 없습니다";
            return view;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = BoardService;

