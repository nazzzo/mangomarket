class TempRepository {
    constructor({ sequelize, User, Temp }) {
        this.sequelize = sequelize
        this.User = User
        this.Temp = Temp
    }

    async findTemp({ email }) {
        try {
            const sql = `
            SELECT tempContent, tempSubject, updatedAt
            FROM Temp
            WHERE email = '${email}' AND id = (
            SELECT MAX(id)
            FROM Temp
            WHERE email = '${email}'
            );`

            const tempData = await this.sequelize.query(sql)
            console.log('tempData ::: ', tempData)
            return tempData
        } catch (e) {
            throw new Error(e)
        }
    }

    async tempDataCreate({ id, content, subject }) {
        try {
            const sql = `
            INSERT INTO Temp (email, tempContent, tempSubject, createdAt, updatedAt) VALUES ('${id}', '${content}', '${subject}', NOW(), NOW());
            `
            const tempData = await this.sequelize.query(sql)
            console.log(tempData)

            return tempData
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = TempRepository

// INSERT INTO Temp (email, tempContent, tempSubject, createdAt, updatedAt) VALUES ('ckstnqkqh1@gmail.com', '하하호호내용', '하하호호제목', NOW(), NOW());
