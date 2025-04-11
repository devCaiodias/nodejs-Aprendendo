const express = require("express")
const service = express()

service.use(express.json())

let customers = [
    { id: 1, name: "Caio", site: "https://devcaiodias.github.io/DevCaiodias-portfolio/",},
    { id: 2, name: "Google", site: "https://google.com",},
    { id: 3, name: "Uol", site: "https://uol.com.br",}
]

// Listando todos os customers
service.get("/customers", (req, res) => {
    return res.json(customers)
})

// Listando os customers por id
service.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const customer = customers.find(item => item.id === id)
    const status = customer ? 200 : 404

    console.debug("GET :: /customers/:id", JSON.stringify(customer))

    res.status(status).json(customer)
1})

// creando umn novo dado no customers
service.post("/customers", (req, res) => {
    const {name, site} = req.body;
    const nextId = customers[customers.length -1].id + 1

    const newCustomer = {id: nextId, name, site}
    customers.push(newCustomer)

    return res.status(201).json(newCustomer)
})

// Atualizando um dado por id
service.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { name, site} = req.body;

    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404

    if (index >= 0) {
        customers[index] = { id: parseInt(id), name, site}
    }

    return res.status(status).json(customers[index])
})

// Deletando um customers por id
service.delete("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404

    if (index >= 0) {
        customers.splice(index, 1)
    }

    return res.status(status).json()
})

service.listen(3000)