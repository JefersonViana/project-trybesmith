import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/products.service';
const product = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4
};

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Caso de Sucesso! - PRODUCTS', async function () {
    const productInstance = ProductModel.build({ id: 6, ...product })
    sinon.stub(ProductModel, 'create').resolves(productInstance);
    const responseService = await productService.create(product);

    expect(responseService).to.be.deep.equal({
      status: 'SUCCESSFUL',
      data: {
        id: 6,
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        orderId: 4
      }
    });
  });

  it('Caso de Falha com name! - PRODUCTS', async function () {
    const responseService = await productService.create({
      name: '',
      price: '30 peças de ouro',
      orderId: 4
    });

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_DATA',
      data: { message: 'name is required' }
    });
  });

  it('Caso de Falha com price! - PRODUCTS', async function () {
    const responseService = await productService.create({
      name: 'Martelo de Thor',
      price: '',
      orderId: 4
    });

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_DATA',
      data: { message: 'price is required' }
    });
  });

  it('Caso de Falha com orderId! - PRODUCTS', async function () {
    const responseService = await productService.create({
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      orderId: 0
    });

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_DATA',
      data: { message: 'orderId is required' }
    });
  });
});
