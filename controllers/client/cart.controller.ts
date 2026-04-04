import Category from "../../models/category.model";

import { Request, Response } from "express";
import { tourRoutes } from "../../routes/client/tour.route";
import Tour from "../../models/tour.model";


//[GET] /cart/
export const index = async  (req: Request, res: Response)=>{
  res.render("client/pages/cart/index",{
    pageTitle: "Giỏ hàng"
  })
}
interface ITour {
  id?: number;
  title?: string;
  images?: string; // Dữ liệu gốc từ DB
  image?: string;  // Sau khi parse lấy 1 ảnh
  info?: any;      // Chứa nguyên cái object infoTour
  [key: string]: any; // Cho phép thêm các thuộc tính khác nếu phát sinh
}
//[GET] /cart/list-json
export const listJson = async (req: Request, res: Response)=>{
  const tours = req.body;
  
  for(const tour of tours ){
    const infoTour: ITour = await Tour.findOne({
      where:{
        id: tour.tourId,
        deleted: false,
        status:"active"
      },
      raw: true
    }) as unknown as ITour; // Ép kiểu trung gian
    if (infoTour) {
      tour["info"] = infoTour; // Gán vào 'tour' (phần tử hiện tại), không phải 'tours'

      if (infoTour["images"]) {
        try {
          const images = JSON.parse(infoTour["images"]);
          tour["image"] = images[0]; // Lấy ảnh đầu tiên
        } catch (e) {
          tour["image"] = ""; // Phòng trường hợp JSON trong DB bị lỗi
        }
      }
      tour["price_special"] = infoTour["price"] * (1- infoTour["discount"]/100);

      tour["total"] = tour["price_special"] * tour["quantity"]
    }
  }
  res.json({
    tours: tours
  })
}