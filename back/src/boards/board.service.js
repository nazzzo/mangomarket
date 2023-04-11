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
            // console.log("scht, sch, srt", searchType, search, sort, count, pagingsort, pagingcategory);
            if (category === `default`) category = ``;
            if (searchType === "email") searchType = "A.email";
            if (search === "undefined") search = "";
            if (!searchType && search) searchType = "A.subject";
            const views = 6;
            let limitval = views * count;
            // console.log(`limitval:::`, limitval);
            if (!count || Number(count) === 1) limitval = views;
            const limit = {
                limit: limitval,
                views,
            };
            if (distance === "undefined") distance = 2.5
            else if (!distance) distance = 10
            const data = await this.boardRepository.findAll({ searchType, search, email, sort, category, limit, pagingsort, pagingcategory, distance });
            // console.log("serv", data);
            return data;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getMain(id) {
        try {
            id = { id: `A.email = '${id}'`, sql: ``, order: `A.id` };
            const main = await this.boardRepository.findMain(id);
            if (main) {
                const tags = main
                    .map((v) => v.tagname)
                    .join(", ")
                    .split(", ");
                const countTags = tags.reduce((acc, tag) => {
                    acc[tag] = (acc[tag] || 0) + 1;
                    return acc;
                }, {});
                // console.log(`main:::`, { main: main, tagnames: countTags });

                return { main: main, tagnames: countTags };
            }
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getFavor(id) {
        // console.log(`id:::`, id);
        try {
            const data = { id: `D.userid = '${id}'`, sql: `JOIN Liked AS D ON A.id = D.boardid `, order: `D.createdAt` };
            // console.log(`data ::::`, data);
            const favor = await this.boardRepository.findMain(data);
            // console.log(`favor ::::`, favor);
            return favor;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getHistory(id) {
        try {
            const data = { id: `D.userid = '${id}'`, sql: `JOIN History AS D ON A.id = D.boardid`, order: `D.createdAt` };
            // console.log(`data ::::`, data);
            const history = await this.boardRepository.findMain(data);
            // console.log(`history ::::`, history);
            return history;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getView(id, email) {
        try {
            const currentState = await this.boardRepository.getState(id);
            // console.log("current state:::", currentState);
            if (currentState === "blind") {
                throw new Error("차단된 게시글입니다");
            }
            const view = await this.boardRepository.findOne(id)
            if (email !== "guest") await this.boardRepository.updatehit(id, email)
            // console.log(view)
            return view
        } catch (e) {
            console.error(e);
        }
    }
    async postWrite({ email, subject, content, hashtag, category, images, thumbnail }) {
        // console.log(`serv :`, { email, subject, content, hashtag, category, images, thumbnail });
        try {
            if (!email || !subject || !content) throw "내용이 없습니다";
            const { username } = await this.userRepository.getUserById(email)
            // console.log(`username::::`, username)
            const boarddata = {
                email,
                subject,
                content,
                hashtag,
                category,
            };
            const write = await this.boardRepository.createBoard(boarddata);
            write.username = username
            // console.log(write.id)
            // images []
            // thumbnail num
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
    async putState(id , {state}) {
        try {
            await this.boardRepository.updateState(id, state);
            return state;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async putView(putdata) {
        // console.log(`serv :`, putdata);
        try {
            const { id, subject, content, hashtag, category, userid } = putdata;
            // console.log(id === "temp");
            if (id === "temp") {
                if (!userid || !subject || !content) throw "내용이 없습니다";
                const imgs = content
                    .split("img src=")
                    .filter((v) => v.indexOf("http") !== -1)
                    .map((v) => v.split("&gt")[0]);
                const boarddata = {
                    userid,
                    subject,
                    content,
                    hashtag,
                    category,
                    image: imgs[0],
                };
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
        // console.log(`serv :`, id);
        try {
            const view = await this.boardRepository.destroyBoard(idx);
            if (view < 1) throw "삭제할 게시글이 없습니다";
            return view;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postComment(boardid, comment) {
        // console.log(`serv :`, { boardid, comment });
        try {
            let { userid, parentid, content, boardWirterid } = comment;
            if (!boardid || !comment.userid || !comment.content) throw "내용이 없습니다";
            if (!parentid) parentid = 0;
            const data = {
                boardid,
                parentid,
                userid,
                content,
            };
            const write = await this.boardRepository.createComment(data);
            // console.log("write", write);

            if (parentid === 0 && userid !== boardWirterid) {
                let point = { boardid, userid: boardWirterid, comment: "1", commentid: write.id };
                const pointrespone = await this.boardRepository.createPoint(point);
                return point;
            } else if (parentid > 0 && userid !== comment.pointUp) {
                let point = { boardid, userid: comment.pointUp, comment: "1", commentid: write.id };
                const pointrespone = await this.boardRepository.createPoint(point);
                return point;
            } else {
                return write;
            }
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async putComment(id, content) {
        // console.log(`serv :`, { id, content });
        try {
            const comment = await this.boardRepository.updateComment({ id, content });
            if (comment < 1) throw "수정할 댓글이 없습니다";
            return comment;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteComment(id) {
        // console.log(`serv :`, id);
        try {
            const comment = await this.boardRepository.destroyComment(id);
            if (comment < 1) throw "삭제할 댓글이 없습니다";
            return comment;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postLike(boardid, email) {
        console.log(`serv :`, { boardid, email });
        try {
            if (!boardid || !email) throw "추천 실패";
            const [count, check] = await this.boardRepository.createLike({ boardid, email });
            return [count, check];
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteLike(boardid, userid) {
        // console.log(`serv :`, { boardid, userid, content });
        try {
            if (!boardid || !userid) throw "추천 취소 실패";
            const remove = await this.boardRepository.destroyLike({ boardid, userid });
            return remove;
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

    async decoded(payload) {
        try {
            const user = this.jwt.decode(payload);
            return user;
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

    async checkTemp(userid) {
        try {
            const checked = this.boardRepository.tempCheck(userid);
            console.log(checked);
            return checked;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async deleteTemp(userid) {
        try {
            await this.boardRepository.tempDestroy(userid);
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
}

module.exports = BoardService;

