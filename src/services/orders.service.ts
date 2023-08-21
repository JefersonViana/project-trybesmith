import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import sequelize from '../database/models/index';
import { ServiceResponse } from '../types/ServiceResponse';
import { User } from '../types/User';
import user from './login.service';

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

type Order = {
  userId: number,
  productIds: number[],
};

async function create(id:number, productIds:number[]): Promise<ServiceResponse<User | Order>> {
  const responseModel = await user.getUserById(id);
  if (!responseModel) {
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  await sequelize.transaction(async (t) => {
    const createOrder = await OrderModel.create({ userId: id }, { transaction: t });
    await Promise.all(productIds.map((productId:number) => (
      ProductModel.update(
        { orderId: createOrder.dataValues.id },
        { where: { id: productId }, transaction: t },
      ))));
  });
  return { status: 'SUCCESSFUL', data: { userId: id, productIds } };
}

export default {
  list,
  create,
};
