import { Router } from "express";
import customers from "./app/controllers/CustomersControllers"
import contact from "./app/controllers/ContactsControllers";

const routes = new Router();

// Customers Route
routes.get("/customers", customers.index)
routes.get("/customers/:id", customers.show)
routes.post("/customers", customers.create)
routes.put("/customers/:id", customers.update)
routes.delete("/customers/:id", customers.delete)


// Customers Contact Route
routes.get("/customers/:customerId/contacts", contact.index)
routes.get("/customers/:customerId/contacts/:id", contact.show)
routes.post("/customers/:customerId/contacts", contact.create)
routes.put("/customers/:customerId/contacts/:id", contact.update)
routes.delete("/customers/:customerId/contacts/:id", contact.delete)



export default routes;