import { Op } from "sequelize";
import Contact from '../models/Contact.js';
import Customer from "../models/Customer.js";
import * as Yup from 'yup'

class ContactsControllers {
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

        let where = { customer_id: req.params.customerId }
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
                    [Op.in]: status.slipt(",").map(item => item.toUpperCase())
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

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ['id', 'status'],
                    required: true
                }
            ],
            order,
            limit,
            offset: limit * page - limit,
        })

        return res.json(data)
    }

    async show(req, res){
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            },
            attributes: {exclude: ['customer_id', 'customerId']}
        })

        if (!contact) {
            return res.status(404).json()
        }

        return res.json(contact)
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase().required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: "Verifique os dados!"
            })
        }
        const newContact = await Contact.create({
            customer_id: req.params.customerId,
            ...req.body
        })
        
        return res.status(201).json(newContact)
    }
    
    async update(req, res) {
        const schema = Yup.object().shape(
            {
                name: Yup.string(),
                email: Yup.string().email(),
                status: Yup.string().uppercase()
            }
        )

        if (!(await schema.isValid(req.body))) {
            return res.status(404).json({
                error: "Verifique os dados!"
            })
        }

        const updateContact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            },
            attributes: { exclude: ["customer_id", "customerId"]}
        })

        if (!updateContact) {
            res.status(404).json({
                error: "Usuario n encontrado!"
            })
        }

        await updateContact.update(req.body)

        return res.json(updateContact)
    }
    
    async delete(req, res) {
        const deleteContact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            },
            attributes: { exclude: ["customer_id", "customerId"]}
        })

        if (!deleteContact) {
            res.status(404).json({
                error: "Usuario n encontrado!"
            })
        }

        await deleteContact.destroy()

        return res.json()
    }
    
}

export default new ContactsControllers();