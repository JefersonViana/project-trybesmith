import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { Arr, ServiceResponse } from '../types/ServiceResponse';

function validateParams(
  { name, price, orderId }:ProductInputtableTypes,
): string | null {
  if (!name) return 'name is required';
  if (!price) return 'price is required';
  if (!orderId) return 'orderId is required';
  return null;
}

async function create(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;

  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
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