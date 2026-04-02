import express, {Request, Response, Express} from "express"
const app: Express = express()
const port:number = 3000 
app.get("/", (req: Request, res: Response)=>{
  res.send("ok")
})
app.listen(port, ()=>{
  console.log(`App listening on port: ${port}`)
})