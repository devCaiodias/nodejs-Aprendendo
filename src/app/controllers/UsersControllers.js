import * as Yup from "yup"
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Users from "../models/Users"

class UsersControllers {
    async index(req, res) {
        const {
            name,
            email,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query

        const page = req.query.page || 1;
        const limit = req.query.limit || 25

        let where = {}
        let order = []

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name
                }
            } 
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email
                }
            } 
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore)
                }
            } 
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter)
                }
            } 
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore)
                }
            } 
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter)
                }
            } 
        }
        
        if (sort) {
            order = sort.split(",").map(item => item.split(":"))
        }


        const data = await Users.findAll({ 
            attributes: {exclude: ['password', "password_hash"]},
            where,
            order,
            limit,
            offset: limit * page - limit
        })

        return res.json(data)
    }

    async show(req, res) {
        const user = await Users.findByPk(req.params.id) 
        
        if (!user) {
            return res.status(404).json()
        }

        return res.json(user)
    }

    async create(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")]) : field
            )
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: "Verifique os dados!"
            })
        }

        const {id, name, email, createdAt, updatedAt} = await Users.create(req.body)

        return res.status(201).json({id, name, email, createdAt, updatedAt})
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

export default new UsersControllers();