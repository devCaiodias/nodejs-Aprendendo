import { Router } from "express";
import customers from "./app/controllers/CustomersControllers"

const routes = new Router();

routes.get("/customers", customers.indeX)
routes.get("/customers/:id", customers.show)
routes.post("/customers", customers.create)
routes.put("/customers/:id", customers.update)
routes.delete("/customers/:id", customers.delete)

export default routes;