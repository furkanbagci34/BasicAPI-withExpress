import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken'

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

            const login = this.auth.login(req.body)

            res.send(await result.successResult("success",{}));
        })
    }
}

class auth {

    constructor(){


    }

    async login(pBody){

    }

    async generateToken(){

    }
}

class cryptoJwt {

    constructor()
    {

    }

    async generateToken(){

    }

    async tokenCheck(){

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