const express = require("express")
const service = express()

service.use(express.json())

let customers = [
    { id: 1, name: "Caio", site: "https://devcaiodias.github.io/DevCaiodias-portfolio/",},
    { id: 2, name: "Google", site: "https://google.com",},
    { id: 3, name: "Uol", site: "https://uol.com.br",}
]

service.get("/customers", (req, res) => {
    return res.json(customers)
})

service.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const customer = customers.find(item => item.id === id)
    const status = customer ? 200 : 404

    res.status(status).json(customer)
1})

service.post("/customers", (req, res) => {
    const {name, site} = req.body;
    const nextId = customers[customers.length -1].id + 1

    const newCustomer = {id: nextId, name, site}
    customers.push(newCustomer)

    return res.status(201).json(newCustomer)
})

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

service.listen(3000)