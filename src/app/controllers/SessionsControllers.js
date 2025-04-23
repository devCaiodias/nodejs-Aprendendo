import Users from "../models/Users";
import jwt from "jsonwebtoken"

import authConfig from '../../config/auth'

class SessionsController {
    async create(req, res) {
        const {email, password} = req.body
        
        const user = await Users.findOne({
            where: {email}
        })

        if (!user) {
            return res.status(401).json({error: "User nao encontrado"})
        }
        
        const testandoPassword = await user.checkPassword(password)

        if(!testandoPassword) {
            return res.status(401).json({error: "Password Invalide!"})
        }

        const {id, name} = user

        return res.json({
            user: {
                id, 
                name, 
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionsController();