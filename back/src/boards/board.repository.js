class BoardRepository {
    constructor({ sequelize, Op, Board, BoardImage, Temp, History, Hashtag, Comment, User, Hash, Liked, Hit, PointUp, Keyword, BoardKeyword, }) {
        this.sequelize = sequelize;
        this.Op = Op;
        this.Board = Board;
        this.BoardImage = BoardImage;
        this.Temp = Temp;
        this.History = History;
        this.Hashtag = Hashtag;
        this.Comment = Comment;
        this.User = User;
        this.Hash = Hash;
        this.Liked = Liked;
        this.Hit = Hit;
        this.PointUp = PointUp;
        this.Keyword = Keyword;
        this.BoardKeyword = BoardKeyword;
    }

    async findAll({ searchType, search, sort, email, category, limit, pagingsort, pagingcategory, distance }) {
        try {
            const check = (post, query) => {
                if (!post && query) {
                    return query;
                } else if (post && !query) {
                    return post;
                } else if (!post && !query) return null;
            };

            let sortvalue = null;
            if (pagingcategory) sortvalue = `hit`;
            let categoryvalue = check(category, pagingcategory);
            let where;
            if ((searchType === "A.subject") | (searchType === "A.content")) {
                where = `AND ${searchType} LIKE '%${search}%'`;
            } else {
                where = !searchType ? "" : `AND ${searchType}="${search}"`;
            }
            const sortKey = !sortvalue ? `ORDER BY A.id DESC` : `ORDER BY ${sortvalue} DESC`;
            const categoryKey = !categoryvalue ? `` : `AND A.category="${categoryvalue}"`;
            (`category:::`, categoryKey, where)
            const limitquery = !limit ? `` : `Limit ${limit.limit}, ${limit.views}`;

            let userLatitude = 37.715133;
            let userLongitude = 126.734086;
            if (email) {
                const user = await this.User.findOne({
                    attributes: ['latitude', 'longitude'],
                    where: { email: email }
                });
                userLatitude = user.latitude;
                userLongitude = user.longitude;
            }
            const query = `SELECT 
            A.id,
            A.email, 
            A.subject, 
            A.content,
            A.createdAt, 
            A.category,
            A.state,
            B.userImg,
            B.username,
            B.address,
            D.image,
            (SELECT GROUP_CONCAT(D.email SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
            GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
            (SELECT COUNT(DISTINCT Chat.customer) FROM Chat WHERE Chat.boardid = A.id) AS messageCount, 
            (SELECT COUNT(Liked.BoardId) FROM Liked WHERE Liked.BoardId = A.id) AS likeCount,
            (SELECT COUNT(Hit.BoardId) FROM Hit WHERE Hit.BoardId = A.id) AS hit,
            ST_Distance_Sphere(POINT(${userLongitude}, ${userLatitude}), POINT(B.longitude, B.latitude)) / 1000 AS distance
            FROM Board AS A 
            LEFT JOIN User AS B ON A.email = B.email
            LEFT JOIN Hashtag AS C ON A.id = C.boardid
            LEFT JOIN BoardImage AS D ON A.id = D.boardid WHERE D.thumbnail = 1
            AND ST_Distance_Sphere(POINT(${userLongitude}, ${userLatitude}), POINT(B.longitude, B.latitude)) / 1000 <= ${distance}
            ${where}${categoryKey}
            GROUP BY A.id, D.id
            ${sortKey}
            ${limitquery};`;
            const [findAll] = await this.sequelize.query(query);
            // console.log(findAll);
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
      A.image,
      A.category,
      A.state,
      B.userImg,
      B.username,
      B.address,
      (SELECT GROUP_CONCAT(D.email SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
      GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
      (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
      (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount,
      (SELECT COUNT(Hit.BoardId) FROM Hit WHERE Hit.BoardId = A.id) AS hit
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
    async findOne(id) {
        try {
            const query = `SELECT 
            A.id,
            A.email, 
            A.subject, 
            A.content,
            A.createdAt, 
            A.category,
            A.state,
            B.userImg,
            B.username,
            B.address,
            E.image,
            GROUP_CONCAT(DISTINCT D.image SEPARATOR ', ') AS images,
            (SELECT GROUP_CONCAT(D.email SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
            GROUP_CONCAT(DISTINCT C.tagname SEPARATOR ', ') AS tagname,
            (SELECT COUNT(Chat.boardid) FROM Chat WHERE Chat.boardid = A.id) AS messageCount, 
            (SELECT COUNT(Liked.BoardId) FROM Liked WHERE Liked.BoardId = A.id) AS likeCount,
            (SELECT COUNT(Hit.BoardId) FROM Hit WHERE Hit.BoardId = A.id) AS hit
        FROM Board AS A 
        LEFT JOIN User AS B ON A.email = B.email
        LEFT JOIN Hashtag AS C ON A.id = C.boardid
        LEFT JOIN BoardImage AS D ON A.id = D.boardid
        JOIN BoardImage AS E ON A.id = E.boardid
        WHERE A.id = ${id}
        AND
        E.thumbnail = 1
        GROUP BY A.id, E.image`;
        const [[findOne]] = await this.sequelize.query(query);
        return findOne
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
    async createBoard(payload) {
        console.log(`boarddata:::`, payload)
        try {
            const { email, username, subject, content, hashtag, category } = payload;
            const createBoard = await this.Board.create(payload, { plain: true });            
            const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
            const tagResult = await Promise.all(addHash);
            await createBoard.addHashes(tagResult.map((v) => v[0]));

            const findKeys = await this.Keyword.findAll({
                where: {
                    [this.Op.or]: [
                        { keyword: { [this.Op.like]: payload.subject } },
                        { keyword: { [this.Op.in]: payload.hashtag } }
                    ]
                }
            });
            // console.log(`findKeys:::`, findKeys)
            if (findKeys.length > 0) {
            const boardKeywords = findKeys.map((key) => ({ boardId: createBoard.id, keywordId: key.id }));
            await this.BoardKeyword.bulkCreate(boardKeywords);
            // console.log(`boardKeywords:::`, boardKeywords)
            }
            return createBoard.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async uploadImage(images) {
        // console.log(`images:::`, images)
        try {
            const imageData = images.map(img => 
                this.BoardImage.create(img)
                )
            const promise = await Promise.all(imageData)
            // console.log(promise)
        } catch (e) {
            throw new Error(e)
        }
    }
    async updateBoard({ id, subject, content, hashtag, category }) {
        // console.log("update :", id, subject, content, hashtag, category );
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
        // console.log("repo :", id);
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
        // console.log("repo :", commentData);
        try {
            const create = await this.Comment.create(commentData);
            return create.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateComment({ id, content }) {
        // console.log("update :", id, content);
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
        // console.log("repo :", id);
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
        // console.log("repo :", boardid, email);
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
        // console.log("repo :", { boardid, email });
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

    async getKeywordId(keywordIds) {
        try {
            const boardIds = await this.BoardKeyword.findAll({
                where: {
                    keywordId: {
                        [this.Op.in]: keywordIds.split(',')
                    }
                },
                attributes: ['boardId'],
                raw: true
            });
            return boardIds;
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
        // console.log("result:::::", result);
        return result;
    }

    async updatehit(id, email) {
        try {
            await this.Hit.findOrCreate({ where: { BoardId: id, email: email } });
        } catch (e) {
            throw new Error(e);
        }
    }
    async updatehistory(email, idx) {
        // console.log("repo history :::", email, idx);
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
            //  console.log(response);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = BoardRepository;



