import { Sequelize, Model } from "sequelize";

class Users extends Model {
    static init (sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING
        },
        {
            sequelize,
            name: {
                singular: "user",
                plural: "users"
            }
        })
    }
}

export default Users