const {
    sequelize: {
        models: { User },
    }
} = require("../../models")

const axios = require('axios')
const qs = require('qs')
const AuthRepository = require("./auth.repository")
const AuthService = require("./auth.service")
const AuthController = require("./auth.controller")
const Kakao = require("./auth.kakao")
const config =require("../../config")

const JWT = require("../../lib/jwt")
const crypto = require("crypto")
// const salt = crypto.randomBytes(16).toString('hex')

const jwt = new JWT({ crypto, config })

const authRepository = new AuthRepository({ User })
const authService = new AuthService({ authRepository, jwt, config })
const authController = new AuthController({ authService })
const kakao = new Kakao({axios, qs, jwt, User})

module.exports = {
    authController,
    kakao
}