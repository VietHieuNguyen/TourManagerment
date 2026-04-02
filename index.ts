import express, {Request, Response, Express} from "express"
const app: Express = express()
const port:number = 3000 

app.set("views", "./views")
app.set("view engine", "pug")
app.get("/", (req: Request, res: Response)=>{
  res.send("ok")
})
app.get("/tours", (req: Request, res: Response)=>{
  res.render("client/pages/tours/index")
})
app.listen(port, ()=>{
  console.log(`App listening on port: ${port}`)
})