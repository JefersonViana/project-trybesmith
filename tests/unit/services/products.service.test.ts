import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/products.service';
import { allProductsFromDb, allProductsForComparison } from '../../mocks/products.mock';

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
      price: '30 peças de ouro',
      orderId: 4
    } as any);

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_DATA',
      data: { message: '"name" is required' }
    });
  });

  it('Caso de Falha com price! - PRODUCTS', async function () {
    const responseService = await productService.create({
      name: 'Martelo de Thor',
      orderId: 4
    } as any);

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_DATA',
      data: { message: '"price" is required' }
    });
  });

  it('Caso de Falha com price.length menor que 3! - PRODUCTS', async function () {
    const responseService = await productService.create({
      name: 'Martelo de Thor',
      price: '30',
      orderId: 0
    });

    expect(responseService).to.be.deep.equal({
      status: 'INVALID_VALUE',
      data: { message: '"price" length must be at least 3 characters long' }
    });
  });

  it('Caso de Sucesso! - GET ALL PRODUCTS', async function () {
    const productInstance = allProductsFromDb.map((prod) => ProductModel.build(prod))
    sinon.stub(ProductModel, 'findAll').resolves(productInstance);
    const responseService = await productService.list();
    
    expect(responseService.status).to.be.deep.equal('SUCCESSFUL');
    expect(responseService.data).to.have.length(5);
  });
});
