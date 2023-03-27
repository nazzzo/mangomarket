class BoardRepository {
    constructor({ sequelize, Board, Temp, History, Hashtag, Comment, User, Hash, Liked, PointUp }) {
        this.sequelize = sequelize;
        this.Board = Board;
        this.Temp = Temp;
        this.History = History;
        this.Hashtag = Hashtag;
        this.Comment = Comment;
        this.User = User;
        this.Hash = Hash;
        this.Liked = Liked;
        this.PointUp = PointUp;
    }

    async findAll({ searchType, search, sort, category, limit, pagingsort, pagingcategory }) {
        try {
            const check = (post, query) => {
                if (!post && query) {
                    return query;
                } else if (post && !query) {
                    return post;
                } else if (!post && !query) return null;
            };

            let sortvalue = check(sort, pagingsort);
            let categoryvalue = check(category, pagingcategory);
            let where;
            if ((searchType === "A.subject") | (searchType === "A.content")) {
                where = `AND ${searchType} LIKE '%${search}%'`;
            } else {
                where = !searchType ? "" : `AND ${searchType}="${search}"`;
            }
            const sortKey = !sortvalue ? `ORDER BY A.id DESC` : `ORDER BY ${sortvalue} DESC`;
            const categoryKey = !categoryvalue ? `` : `AND category="${categoryvalue}"`;
            const limitquery = !limit ? `` : `Limit ${limit.limit}, ${limit.views}`;

            const query = `SELECT 
        A.id,
        A.email, 
        A.subject, 
        A.content,
        A.createdAt, 
        A.hit,
        A.image,
        A.category,
        A.state,
        B.userImg,
        B.username,
        (SELECT GROUP_CONCAT(D.email SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
        GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
        (SELECT COUNT(boardid) FROM Chat WHERE boardid = A.id) AS messageCount, 
        (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
        FROM Board AS A 
        LEFT JOIN User AS B 
        ON A.email = B.email
        LEFT JOIN Hashtag AS C
        ON A.id = C.boardid
        ${where}${categoryKey}
        GROUP BY A.id
        ${sortKey}
        ${limitquery};`;
            const [findAll] = await this.sequelize.query(query);
            console.log(findAll);
            return findAll;
        } catch (e) {
            throw new Error(e);
        }
    }
    async findMain({ id, sql, order }) {
        console.log(`repository :::`, id, sql, order);
        try {
            const query = `SELECT 
      A.id,
      A.email, 
      A.subject, 
      A.createdAt, 
      A.hit,
      A.image,
      A.category,
      A.state,
      B.userImg,
      B.username,
      (SELECT GROUP_CONCAT(D.email SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
      GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
      (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
      (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
      FROM Board AS A 
      JOIN User AS B 
      ON A.email = B.email
      JOIN Hashtag AS C
      ON A.id = C.boardid
      ${sql}
      Where ${id}
      GROUP BY A.id
      ORDER BY ${order} DESC;`;
            const [findAll] = await this.sequelize.query(query);
            return findAll;
        } catch (e) {
            throw new Error(e);
        }
    }
    async findOne(id, idx) {
        try {
            const [view] = await this.findAll({ searchType: "A.id", search: idx, notice: 1 });
            console.log("view :::", view);
            // const comment = await this.Comment.findAll({
            //     raw: true,
            //     where: { boardid: idx },
            // });
            // console.log("view", view);
            const [comment] = await this.sequelize.query(`
            WITH RECURSIVE comments (id, content, depth, parentid, createdAt, updatedAt, boardid, email, PATH) AS (
SELECT id, content, depth, parentid, createdAt, updatedAt, boardid, email, CAST(id as CHAR(100))
  FROM Comment
  WHERE parentid = 0
  UNION ALL
  SELECT t.id, t.content, comments.depth + 1, t.parentid, t.createdAt, t.updatedAt, t.boardid, t.email, CONCAT(comments.PATH, '-', t.id)
  FROM comments
  JOIN Comment t ON comments.id = t.parentid
)
SELECT comments.*, B.userimg
FROM comments
JOIN User AS B
ON comments.email = B.email
WHERE comments.boardid = ${idx}
ORDER BY SUBSTRING_INDEX(PATH, '-', 1)*1, SUBSTRING_INDEX(PATH, '-', -1)*1;`);
            // const hashtag = await this.Hashtag.findAll({
            //     attributes: ["tagname"],
            //     raw: true,
            //     where: { boardid: idx },
            // });

            const prevPost = await this.findPrevOne(id, idx);
            const nextPost = await this.findNextOne(id, idx);
            // console.log(`repo::::`, prevPost, nextPost);
            console.log("comment", [view, prevPost, nextPost, comment]);
            return [view, prevPost, nextPost, comment];
        } catch (e) {
            throw new Error(e);
        }
    }
    async findPrevOne(id, idx) {
        const [[prevPost]] = await this.sequelize.query(`
          SELECT subject, email, id FROM Board WHERE email ='${id}' and id < ${idx} ORDER BY id DESC LIMIT 1
          `);
        if (!prevPost) return null;
        return prevPost;
    }
    async findNextOne(id, idx) {
        const [[nextPost]] = await this.sequelize.query(`
          SELECT subject, email, id FROM Board WHERE email ='${id}' and id > ${idx} ORDER BY id ASC LIMIT 1
        `);
        if (!nextPost) return null;
        return nextPost;
    }
    async createBoard(boarddata) {
        try {
            const { email, username, subject, content, hashtag, category, image } = boarddata;
            const createBoard = await this.Board.create(boarddata, { plain: true });
            // const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
            // const tagResult = await Promise.all(addHash);
            // await createBoard.addHashes(tagResult.map((v) => v[0]));
            const boardid = createBoard.dataValues.id;
            return createBoard.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async getState(id) {
        try {
            const board = await this.Board.findOne({ where: { id: id } });
            return board.state;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateState(id, state) {
        try {
            let result = await this.Board.update(
                {
                    state: state,
                },
                { where: { id: id } }
            );
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateBoard({ id, subject, content, hashtag, category }) {
        console.log("update :", id, subject, content, hashtag, category );
        try {
            const updateBoard = await this.Board.update(
                {
                    subject: subject,
                    content: content,
                },
                { where: { id: id } }
            );
            if (hashtag[0]) {
                const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
                await this.Hashtag.destroy({ where: { boardid: id } });
                const addHashTag = hashtag.map((tagname) => this.Hashtag.create({ boardid: id, tagname }));
                await Promise.all(addHash, addHashTag);
            }

            return updateBoard;
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyBoard(id) {
        console.log("repo :", id);
        try {
            const destroy = await this.Board.destroy({
                where: { id: id },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createComment(commentData) {
        console.log("repo :", commentData);
        try {
            const create = await this.Comment.create(commentData);
            return create.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateComment({ id, content }) {
        console.log("update :", id, content);
        try {
            const update = await this.Comment.update(
                {
                    content: content,
                },
                { where: { id: id } }
            );
            return update;
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyComment(id) {
        console.log("repo :", id);
        try {
            const destroy = await this.Comment.destroy({
                where: { id: id },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createLike({ boardid, email }) {
        console.log("repo :", boardid, email);
        try {
            const check = await this.Liked.findOne({ where: { boardid, email } });
            if (check === null) {
                await this.Liked.create({ boardid, email });
            } else {
                await this.Liked.destroy({ where: { boardid, email } });
            }
            const count = await this.Liked.findAndCountAll({
                where: { boardid },
            });
            const recheck = await this.Liked.findOne({ raw: true, where: { boardid, email } });
            return [count.count, recheck];
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyLike({ boardid, email }) {
        console.log("repo :", { boardid, email });
        try {
            const destroy = await this.Liked.destroy({
                where: {
                    BoardId: boardid,
                    email: email,
                },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getMyAttention(email) {
        const sql = `SELECT 
            (SELECT COUNT(*) 
            FROM Liked 
            WHERE boardid IN( SELECT id FROM Board WHERE email='${email}')
            ) AS likes, 
            (SELECT COUNT(*) 
            FROM Comment 
            WHERE boardid IN( SELECT id FROM Board WHERE email='${email}')) 
            AS comment, 
            SUM(hit) 
            AS view 
            FROM board 
            where email='${email}';`;

        const result = await this.sequelize.query(sql);
        console.log("result:::::", result);
        return result;
    }

    async updatehit(id) {
        try {
            await this.Board.increment({ hit: 1 }, { where: { id: id } });
        } catch (e) {
            throw new Error(e);
        }
    }
    async updatehistory(email, idx) {
        console.log("repo history :::", email, idx);
        try {
            const check = await this.History.findOne({ raw: true, where: { email, boardid: idx } });
            if (!check) {
                await this.History.create({ email, boardid: idx });
            } else {
                await this.History.destroy({ where: { email, boardid: idx } });
                await this.History.create({ email, boardid: idx });
            }

            const sql = `
                DELETE FROM History
                WHERE email = '${email}'
                AND boardid NOT IN (SELECT boardid
                  FROM (SELECT boardid FROM History
                    WHERE email = '${email}'
                    ORDER BY createdAt DESC
                    LIMIT 20) subquery)`;

            await this.sequelize.query(sql, { replacements: [email, email] });
        } catch (e) {
            throw new Error(e);
        }
    }

    async tempCheck(email) {
        try {
            const response = await this.Temp.findOne({ raw: true, where: { email } });
            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    async tempDestroy(email) {
        try {
            const response = await this.Temp.destroy({ raw: true, where: { email } });
            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createPoint(data) {
        try {
            const response = await this.PointUp.create(data);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = BoardRepository;
