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

    async findAll({ searchType, search, email, category, limit, pagingcategory, distance }) {
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
            const [result] = await this.sequelize.query(query);
            return result;
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
            const [[result]] = await this.sequelize.query(query);
            return result
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
        return result;
    }

    async getKeywordId(keywordIds) {
        try {
            const result = await this.BoardKeyword.findAll({ where: { keywordId: { [this.Op.in]: keywordIds.split(',') } }, attributes: ['boardId'], raw: true });
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createBoard(payload) {
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
            if (findKeys.length > 0) {
                const boardKeywords = findKeys.map((key) => ({ boardId: createBoard.id, keywordId: key.id }));
                await this.BoardKeyword.bulkCreate(boardKeywords);
            }
            return createBoard.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }

    async uploadImage(images) {
        try {
            const imageData = images.map(img => this.BoardImage.create(img))
            await Promise.all(imageData)
        } catch (e) {
            throw new Error(e)
        }
    }

    async createPoint(data) {
        try {
            await this.PointUp.create(data);
        } catch (e) {
            throw new Error(e);
        }
    }

    async createLike({ boardid, email }) {
        try {
            const check = await this.Liked.findOne({ where: { boardid, email } });
            if (check === null) {
                await this.Liked.create({ boardid, email });
            } else {
                await this.Liked.destroy({ where: { boardid, email } });
            }
            const count = await this.Liked.findAndCountAll({ where: { boardid } });
            const recheck = await this.Liked.findOne({ raw: true, where: { boardid, email } });
            return [count.count, recheck];
        } catch (e) {
            throw new Error(e);
        }
    }

    // async updateBoard({ id, subject, content, hashtag, category }) {
    //     try {
    //         const result = await this.Board.update({ subject: subject, content: content }, { where: { id: id } });

    //         if (hashtag[0]) {
    //             const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
    //             await this.Hashtag.destroy({ where: { boardid: id } });
    //             const addHashTag = hashtag.map((tagname) => this.Hashtag.create({ boardid: id, tagname }));
    //             await Promise.all(addHash, addHashTag);
    //         }

    //         return result;
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }

    // async tempDestroy(email) {
    //     try {
    //         const result = await this.Temp.destroy({ raw: true, where: { email } });
    //         return result;
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }

    // async destroyBoard(id) {
    //     try {
    //         const result = await this.Board.destroy({ where: { id: id } });
    //         return result;
    //     } catch (e) {
    //         throw new Error(e);
    //     }
    // }
}

module.exports = BoardRepository;



