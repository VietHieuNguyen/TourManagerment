import Tour from "../../models/tour.model";
import { Request, Response } from "express";


//[GET] /tours
export const index = async  (req: Request, res: Response)=>{

  const tours = await Tour.findAll({
    where:{
      deleted: false,
      status:"active"
    }
    ,raw: true
  });
  res.render("client/pages/tours/index",{
    tours: tours
  })
}