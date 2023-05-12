import express, { Request, Response } from 'express'
import cors from 'cors'
import { AccountDB, UserDB } from './types'
import { User } from './models/User'
import { Account } from './models/Account'
import { UserDatabase } from './database/UserDatabase'
import { AccountDatabase } from './database/AccountDatabase'
import { UserControler } from './controller/UserController'
import { AccountController } from './controller/AccountController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const userController = new UserControler()
const accountController = new AccountController()



app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/users", userController.getUsers) //endpoint refatorado em um método no arquivo UserController;

app.post("/users", userController.createUsers)

app.get("/accounts", accountController.getAccount)

app.get("/accounts/:id/balance", accountController.getBalanceById)

app.post("/accounts", accountController.createAccounts)

app.put("/accounts/:id/balance", accountController.updateBalance)