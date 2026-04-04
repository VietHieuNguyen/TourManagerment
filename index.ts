import express, {Request, Response, Express} from "express"
import sequelize from "./config/database"
import dotenv from "dotenv"
import Tour from "./models/tour.model"
dotenv.config()
const app: Express = express()
const port:number|string = process.env.PORT || 3000
sequelize;
app.set("views", "./views")
app.set("view engine", "pug")
app.get("/", (req: Request, res: Response)=>{
  res.send("ok")
})
app.get("/tours",async  (req: Request, res: Response)=>{
  const tours = await Tour.findAll({
    raw: true
  });
  console.log(tours)
  res.render("client/pages/tours/index",{
    tours: tours
  })
})
app.listen(port, ()=>{
  console.log(`App listening on port: ${port}`)
})