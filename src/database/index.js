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
        this.assosiate()
    }
    
    init() {
        models.forEach(model => model.init(this.connection))
    }

    assosiate() {
        models.forEach(model => {
            if(model.associate) {
                model.associate(this.connection.models)
            }
        })
    }
}

export default Database;