import Category from "../../models/category.model";

import { Request, Response } from "express";


//[GET] /admin/categories
export const index = async  (req: Request, res: Response)=>{

  const categories = await Category.findAll({
      where:{
      deleted: false 
    }
    ,raw: true
  })

  res.render("admin/pages/category/index",{
    categories: categories,
    pageTitle: "Danh mục tour"
  })
}