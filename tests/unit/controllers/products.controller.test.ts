import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/products.service';
import productController from '../../../src/controllers/products.controller';
import { allProductsFromDb } from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {
    body: {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      orderId: 4
    },
  } as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Caso de Sucesso! - PRODUCTSCONTROLLER', async function () {
    sinon.stub(productService, 'create').resolves({ status: 'SUCCESSFUL', data: {
        id: 6,
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        orderId: 4
    } });

    await productController.create(req, res);
    
    expect(res.status).to.has.been.calledWith(201);
    expect(res.json).to.has.been.calledWith({
        id: 6,
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        orderId: 4
    });
  });

  it('Caso de Falha com name! - PRODUCTSCONTROLLER', async function () {
    sinon.stub(productService, 'create').resolves({ status: 'INVALID_DATA', data: {
        message: 'name is required',
    } });
    req.body.name = '';
    await productController.create(req, res);
    
    expect(res.status).to.has.been.calledWith(400);
    expect(res.json).to.has.been.calledWith({
        message: 'name is required',
    });
  });

  it('Caso de Falha com price! - PRODUCTSCONTROLLER', async function () {
    sinon.stub(productService, 'create').resolves({ status: 'INVALID_DATA', data: {
        message: 'price is required',
    } });
    req.body.name = 'Martelo de Thor';
    req.body.price = '';
    await productController.create(req, res);
    
    expect(res.status).to.has.been.calledWith(400);
    expect(res.json).to.has.been.calledWith({
        message: 'price is required',
    });
  });

  it('Caso de Falha com orderId! - PRODUCTSCONTROLLER', async function () {
    sinon.stub(productService, 'create').resolves({ status: 'INVALID_DATA', data: {
        message: 'orderId is required',
    } });
    req.body.price = '30 peças de ouro';
    req.body.orderId = 0;
    await productController.create(req, res);
    
    expect(res.status).to.has.been.calledWith(400);
    expect(res.json).to.has.been.calledWith({
        message: 'orderId is required',
    });
  });

  it('Caso de Sucesso! - GET ALL PRODUCTSCONTROLLER', async function () {
    const productInstance = allProductsFromDb.map((prod) => ProductModel.build(prod))
    sinon.stub(productService, 'list').resolves({ status: 'SUCCESSFUL', data: productInstance });

    await productController.list(req, res);
    
    expect(res.status).to.has.been.calledWith(200);
    expect(res.json).to.has.been.calledWith(productInstance);
  });

  it('Caso de Sucesso! - GET ALL PRODUCTSCONTROLLER', async function () {
    sinon.stub(productService, 'list').resolves({ status: 'INVALID_DATA', data: { message: 'Product not found' } });

    await productController.list(req, res);
    
    expect(res.status).to.has.been.calledWith(500);
    expect(res.json).to.has.been.calledWith({ message: 'Product not found' });
  });
});
