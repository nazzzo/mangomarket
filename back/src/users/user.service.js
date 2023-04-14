class UserService {
    constructor({ userRepository, jwt, config }) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.BadRequest = config.exception.BadRequest;
        this.crypto = jwt.crypto;
        this.config = config;
        this.salt = config.salt
    }

    async signup(userData) {
        try {
            if (!userData.userImg) userData.userImg = `http://${this.config.host}:${this.config.imgport}/default-image.png`
            const { email, username, userpw, address, ...rest } = userData;
            if (!email || !userpw || !username) throw "내용이 없습니다";
            const hash = this.crypto.createHmac("sha256", this.salt).update(userpw).digest("hex");
            const user = await this.userRepository.addUser({
                email,
                username,
                userpw: hash,
                address: null,
                ...rest,
            });
            return user;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async userCheck(user) {
        try {
            const userCheck = await this.userRepository.findUser(user);
            return userCheck;
        } catch (e) {
            throw new Error(e);
        }
    }

    async me(token) {
        try {
            const { userid } = this.jwt.verifyToken(token, this.salt);
            const user = await this.userRepository.getUserById(userid);
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async putProfile(userData) {
        try {
            console.log(`userData ::::`, userData);
            if (!userData.userImg) userData.userImg = `http://${this.config.host}:${this.config.imgport}/default-image.png`
            const updatedUser = await this.userRepository.updateProfile(userData);
            console.log(`service:::`, updatedUser)
            if (updatedUser === 1) {
                const { email, userImg, username } = await this.userRepository.getUserById(userData.email);
                return { email, userImg, username };
            } else {
                const error = new Error("수정 실패");
                error.status = 401;
                throw error;
            }
        } catch (e) {
            next(e);
        }
    }
    
    async deleteUser(user) {
        try {
            const drop = await this.userRepository.destroyUser(user);
            return drop;
        } catch (e) {
            throw new Error(e);
        }
    }
    
    async findPoint(email) {
        try {
            const point = await this.userRepository.findPoint(email);
            return point;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postKeyword(data) {
        try {
            const keyword = await this.userRepository.addKeyword(data)
            return keyword
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async deleteKeyword(data) {
        try {
            const keyword = await this.userRepository.destroyKeyword(data)
            return keyword
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = UserService;

