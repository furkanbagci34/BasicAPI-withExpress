import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js"
import data from './data.js'

class main {

    constructor()
    {
        dotenv.config()
        this.app = express()

        this.app.listen(process.env.PORT)
        this.app.use(express.json())
        
        this.auth = new auth()

        this.apiStart()
    }

    async apiStart() {

        this.app.post('/', async (req, res) => {

            res.send(await result.successResult("success",{}));
        })

        this.app.post('/login', async (req, res) => {

            const login = await this.auth.login(req.body)

            if(login) {
                res.send(await result.successResult("success",{accessToken: login}));
            }
            else {
                res.status(401).send(await result.errorResult(("Invalid Login")));
            }
        })
    }
}

class auth {

    constructor(){
        this.crypto = new crypto()
        this.secretKey = "exampleSecretKey"
    }

    async login(body){
        const { login, pass } = body;
        const user = data.find(u => u.login === login && u.pass === pass);

        if(user) {
            return this.generateToken(login, pass)
        }
        else {
            return false
        }
    }

    async generateToken(login,pass){
        const tokenData = this.crypto.encrypt(`${login}:${pass}`)

        return jwt.sign({tokenData}, this.secretKey);
    }
}

class crypto {

    constructor()
    {
        this.CRYPTO_KEY = "exampleKey"
    }
    async encrypt(pData){
        return CryptoJS.AES.encrypt(pData, this.CRYPTO_KEY).toString();
    }
    async decrypt(pData){
        return CryptoJS.AES.decrypt(pData, this.CRYPTO_KEY).toString();
    }
}

class result {

    static async successResult(pMessage,pBody){
        return {
            "success" : true,
            "message" : pMessage,
            "statusCode" : 200,
            "body": pBody
        }
    }
    static async errorResult(pMessage){
        return {
            "success" : false,
            "message" : pMessage,
            "statusCode" : 404,
            "body": {}
        }
    }
}

export default main = new main()