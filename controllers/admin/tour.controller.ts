
import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";
import { systemConfig } from "../../config/system";
import TourCategory from "../../models/tour-category.model";

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


//[GET] /admin/categories/create
export const create = async (req: Request, res : Response)=>{
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status:"active"
    }
  })
  res.render("admin/pages/tours/create",{
    pageTitle: "Thêm mới tour",
    categories
  })
}

//[POST] /admin/categories/create
export const createPost = async (req: Request, res: Response)=>{
  const countTour = await Tour.count()
  const code = generateTourCode(countTour+1)
  if(req.body.position === ''){
    req.body.position = countTour + 1
  }else{
    req.body.position = parseInt(req.body.position)
  }
  const dataTour = {
    title: req.body.title,
    code: code,
    images: JSON.stringify(req.body.images),
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: req.body.position,
    status: req.body.status,
    information: req.body.infomation,
    schedule: req.body.schedule
  }
  const tour = await Tour.create(dataTour) as any
  // console.log(parseInt(req.body.category_id))
  const tourId = tour["id"];

  const dataTourCategory = {
    tour_id: tourId,
    category_id: parseInt(req.body.category_id)
  }
  await TourCategory.create(dataTourCategory)
  res.redirect(`/${systemConfig.prefixAdmin}/tours`)
}