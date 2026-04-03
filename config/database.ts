import dotenv from "dotenv"
dotenv.config()
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DB_NAME! , //ten db
  process.env.DB_USERNAME!, //tk
  process.env.DB_PASSWORD!, //mk
  {
    host: process.env.HOST, //link hosting
    dialect: 'mysql'
  }
)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connect Success')

  })
  .catch((error) => {
    console.log('Connect Error')
  })
export default sequelize;