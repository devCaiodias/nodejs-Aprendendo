const express = require("express")
const service = express()

// Query params = ?nome=Caio&idade=17
service.get("/hello", (req, res) => {
    const {nome, idade} = req.query
    res.json({
        message: "Helloo word  query params",
        nome,
        idade
    })
})

// Route params = /hello/:nome

service.get("/hello/:nome", (req, res) => {
    const nome = req.params.nome

    res.json({
        message: "Helloo word Route params",
        nome
    })
})

service.listen(3000)