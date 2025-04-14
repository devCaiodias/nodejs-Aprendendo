import { Sequelize } from "sequelize";

import config from '../config/database.js'

import Customer from '../app/models/Customer.js';
import Contact from '../app/models/Contact.js';
import Users from '../app/models/Users.js';


const models =  [Customer, Contact, Users]

class Database {
    constructor () {
        this.connection = new Sequelize(config)
        this.init()
    }
    
    init() {
        models.forEach(model => model.init(this.connection))
    }
}

export default Database;