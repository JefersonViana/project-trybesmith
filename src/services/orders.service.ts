import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { UserSequelizeModel } from '../database/models/user.model';
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

async function create(id: string): Promise<ServiceResponse<User>> {
  let responseService: ServiceResponse<User>;
  const responseModel = await user.getUserById(id);
  if (!responseModel) {
    responseService = { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
    return responseService;
  }
  responseService = { status: 'SUCCESSFUL', data: responseModel.dataValues };
  return responseService;
}

export default {
  list,
  create,
};
