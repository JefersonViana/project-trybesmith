import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { Arr, ServiceResponse } from '../types/ServiceResponse';
import check from '../utils/checkRequiredField';
import userSchema from '../utils/schemas';

async function create(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;

  const requerid = check.checkRequiredField(product, ['name', 'price']);

  if (requerid) {
    responseService = { status: 'INVALID_DATA', data: { message: requerid } };
    return responseService;
  }
  const { error } = userSchema.validate({ name: product.name, price: product.price });
  if (error) {
    responseService = { status: 'INVALID_VALUE', data: { message: error.message } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  return responseService;
}

async function list(): Promise<ServiceResponse<Arr>> {
  const responseModel = await ProductModel.findAll();
  const arrProducts: Arr = responseModel;
  return { status: 'SUCCESSFUL', data: arrProducts };
}

export default {
  create,
  list,
};