const express = require("express")
const service = express()

service.use(express.json())

let customers = [
    { id: 1, noma: "Caio", site: "https://devcaiodias.github.io/DevCaiodias-portfolio/",},
    { id: 2, noma: "Google", site: "https://google.com",},
    { id: 3, noma: "Uol", site: "https://uol.com.br",}
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

service.listen(3000)