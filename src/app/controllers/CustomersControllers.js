import Customer from '../models/Customer.js';


let customers = [
    { id: 1, name: "Caio", site: "https://devcaiodias.github.io/DevCaiodias-portfolio/",},
    { id: 2, name: "Google", site: "https://google.com",},
    { id: 3, name: "Uol", site: "https://uol.com.br",}
]

class CustomersControllers {

    // Listando todos os customers
    async index(req, res) {
        const data = await Customer.findAll({ limit: 1000 })
        return res.json(data)
    }

    // Listando os customers por id
    show(req, res) {
        const id = parseInt(req.params.id)
        const customer = customers.find(item => item.id === id)
        const status = customer ? 200 : 404;

        res.status(status).json(customer)
    }

    // creando umn novo dado no customers
    create(req, res) {
        const {name, site} = req.body;
        const nextId = customers[customers.length -1].id + 1

        const newCustomer = {id: nextId, name, site}
        customers.push(newCustomer)

        return res.status(201).json(newCustomer)
    }

    // Atualizando um dado por id
    update(req, res) {
        const id = parseInt(req.params.id)
        const { name, site} = req.body;

        const index = customers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if (index >= 0) {
            customers[index] = { id: parseInt(id), name, site}
        }

        return res.status(status).json(customers[index])
    }

    // Deletando um customers por id
    delete(req, res) {
        const id = parseInt(req.params.id)
        const index = customers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if (index >= 0) {
            customers.splice(index, 1)
        }

        return res.status(status).json()
    }
}

export default new CustomersControllers();