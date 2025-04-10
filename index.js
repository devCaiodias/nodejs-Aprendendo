const express = require("express")
const service = express()

service.get("/", (req, res) => {
    res.json({
        message: "Helloo word",
    })
})

service.listen(3000)