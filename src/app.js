import express from "express"
import routes from "./routes"
import authMiddlewares from "./app/middleswares/auth.js"

import "./database"

class App {
    constructor () {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares () {
        this.server.use(express.json())
        this.server.use(authMiddlewares)

    }

    routes () {
        this.server.use(routes)
    }
}

export default new App().server
