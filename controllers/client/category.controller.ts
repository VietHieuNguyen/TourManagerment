import Category from "../../models/category.model";

import { Request, Response } from "express";


//[GET] /categories
export const index = async  (req: Request, res: Response)=>{

  const categories = await Category.findAll({
      where:{
      deleted: false ,
      status: "active"
    }
    ,raw: true
  }
  
  )

  res.render("client/pages/category/index",{
    categories: categories,
    pageTitle: "Danh mục tour"
  })
}