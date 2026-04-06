
import { Request, Response } from "express";
import Tour from "../../models/tour.model";

//[GET] /admin/categories
export const index = async  (req: Request, res: Response)=>{

  const tours = await Tour.findAll({
      where:{
      deleted: false 
    }
    ,raw: true
  })as any
  tours.forEach((item:any) =>{
    if(item["images"]){
      const images = JSON.parse(item["images"]);
      item["image"] = images[0]
    }
    item["price_special"] = (item["price"] * (1 - item["discount"]/100))
  })
  res.render("admin/pages/tours/index",{
    pageTitle: "Danh mục tour",
    tours
  })
}