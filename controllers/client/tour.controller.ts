import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { Request, Response } from "express";


//[GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  // const tours = await Tour.findAll({
  //   where:{
  //     deleted: false,
  //     status:"active"
  //   }
  //   ,raw: true
  // });

  const tours = await sequelize.query(`
    SELECT tours.*, ROUND(price * (1 - discount/100) , 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `, {
    type: QueryTypes.SELECT
  })
  interface Tour {
  images?: string; // JSON string từ database
  image?: string;  // Thuộc tính sẽ gán thêm vào
  [key: string]: any; // Cho phép truy cập bằng key string
}
  tours.forEach((item: Tour) =>{
    if(item["images"]){
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
    item["price_special"] = parseFloat(item["price_special"])
  })
  res.render("client/pages/tours/index", {
    tours: tours,
    pageTitle: "Danh sách tour"
  })
}