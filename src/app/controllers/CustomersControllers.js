import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import Customer from '../models/Customer.js';
import Contact from '../models/Contact.js';


class CustomersControllers {

    // Listando todos os customers
    async index(req, res) {
        const {
            name,
            email,
            status,
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

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase())
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


        const data = await Customer.findAll({ 
            where,
            include: [
                {
                    model: Contact,
                    attributes: ['id', 'status'],
                },
            ],
            order,
            limit,
            offset: limit * page - limit
        })

        return res.json(data)
    }

    // Listando os customers por id
    async show(req, res) {
        const customer = await Customer.findByPk(req.params.id)
        
        if (!customer) {
            return res.status(404).json({error: "Usuario n encontrado!"})
        }

        return res.json(customer)
    }

    // creando umn novo dado no customers
    async create(req, res) {
        const schema = Yup.object().shape(
            {
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                status: Yup.string().uppercase().required()
            }
        )

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: "Verifique os dados!"
            })
        }

        const newCustomer = await Customer.create(req.body)


        return res.status(201).json(newCustomer)
    }

    // Atualizando um dado por id
    async update(req, res) {
        const schema = Yup.object().shape(
            {
                name: Yup.string(),
                email: Yup.string().email(),
                status: Yup.string().uppercase()
            }
        )

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: "Verifique os dados!"
            })
        }

        const updateCustomer = await Customer.findByPk(req.params.id)

        if (!updateCustomer) {
            res.status(404).json({
                error: "Usuario n encontrado!"
            })
        }

        await updateCustomer.update(req.body)

        return res.json(updateCustomer)
    }

    // Deletando um customers por id
    async delete(req, res) {
        const deleteCustomer = await Customer.findByPk(req.params.id)

        if (!deleteCustomer) {
            res.status(404).json({
                error: "Usuario n encontrado!"
            })
        }

        await deleteCustomer.destroy()

        return res.json()
    }
}

export default new CustomersControllers();