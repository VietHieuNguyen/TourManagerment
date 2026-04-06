import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudianry";
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req["file"]) {
      const result = await uploadToCloudinary(req["file"].buffer);
      req.body[req["file"].fieldname] = result;
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  // 1. Ép kiểu req.files để TypeScript không báo lỗi
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!files) {
    return next();
  }

  try {
    for (const key in files) {
      req.body[key] = [];

      const array = files[key];
      
      // 2. Tối ưu: Dùng Promise.all để upload song song các file trong 1 array
      // giúp tốc độ upload nhanh hơn nhiều so với dùng vòng lặp await từng cái
      const uploadPromises = array.map((item) => uploadToCloudinary(item.buffer));
      
      const results = await Promise.all(uploadPromises);
      
      // Đẩy tất cả link ảnh đã upload thành công vào body
      req.body[key] = results;
    }
    next();
  } catch (error) {
    console.error("Lỗi upload Cloudinary:", error);
    // Bạn nên xử lý trả về lỗi hoặc gọi next(error) để tránh treo request
    next(); 
  }
};