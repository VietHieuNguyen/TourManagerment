import { cartRoutes } from "./cart.route";
import { categoryRoutes } from "./category.route";
import { orderRoutes } from "./order.route";
import { tourRoutes } from "./tour.route";
import { Express } from "express";

const clientRoutes = (app: Express)=>{
  app.use("/tours", tourRoutes)

  app.use("/categories",categoryRoutes)

  app.use("/cart", cartRoutes)

  app.use("/order", orderRoutes)
}
export default clientRoutes;