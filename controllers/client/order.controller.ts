import { Request, Response } from "express"
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";
export const order = async (req: Request, res: Response)=>{
  const data = req.body;


  //Luư data vào bảng orders
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial"
  }
  
  const order = await Order.create(dataOrder)

  const orderId = order.dataValues.id
  const code = generateOrderCode(orderId);
  await Order.update({
    code: code
  },{
    where:{
      id: orderId
    }
  });



interface IData{
  orderId: number;
  tourId: number;
  quantity: number;
  price: number;
  discount?: number;   // Dấu ? vì trong model bạn không để allowNull: false
  timeStart: Date;
}
  //Lưu data vào order_items
for(const item of data.cart){
  const dataItem = {
    orderId: orderId,
    tourId: item.tourId,
    quantity: item.quantity
  } as unknown as IData
 
  const infoTour = await Tour.findOne({
    where:{
      id: item.tourId,
      deleted: false,
      status: "active"
    },
    raw: true
  }) as unknown as IData
  if(infoTour){
  dataItem["price"] = infoTour["price"]
  dataItem["discount"] = infoTour["discount"]
  dataItem["timeStart"] = infoTour["timeStart"]
  }
  await OrderItem.create(dataItem as any)
  
}

  
  res.json({
    code: 200, 
    message:"Đặt hàng thành công!",
    orderCode: code
  })
}