import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function list(): Promise<ServiceResponse<unknown[]>> {
  const responseModel = await OrderModel.findAll({
    include: [
      { model: ProductModel,
        as: 'productIds',
        attributes: ['id'] },
    ],
  });
  
  const newArr = responseModel.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map((product) => product.id) || [],
  }));

  return { status: 'SUCCESSFUL', data: newArr };
}

export default {
  list,
};
