import { tourRoutes } from "./tour.route";
import { Express } from "express";

const clientRoutes = (app: Express)=>{
  app.use("/tours", tourRoutes)
}
export default clientRoutes;