
import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app: Express)=>{
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`/${PATH_ADMIN}`+"/categories",categoryRoutes)

}
export default adminRoutes;