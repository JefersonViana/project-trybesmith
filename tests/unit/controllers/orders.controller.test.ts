import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersService from '../../../src/services/orders.service';
import ordersController from '../../../src/controllers/orders.controller';
import { allOrdersForComparison } from '../../mocks/orders.mock';


chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Caso de Sucesso! - ORDERS', async function () {
    sinon.stub(ordersService, 'list').resolves({
      status: 'SUCCESSFUL',
      data: allOrdersForComparison,
    });
    await ordersController.list(req, res);
    expect(res.status).to.has.been.calledWith(200);
    expect(res.json).to.has.been.calledWith(allOrdersForComparison);
  });

  it('Caso de Falha! - ORDERS', async function () {
    sinon.stub(ordersService, 'list').resolves({
      status: 'NOT_FOUND',
      data: { message: 'Orders not found' },
    });
    await ordersController.list(req, res);
    expect(res.status).to.has.been.calledWith(500);
    expect(res.json).to.has.been.calledWith({ message: 'Orders not found' });
  });

  it('Caso de Falha para criar um pedido! - ORDERS', async function () {
    sinon.stub(ordersService, 'create').resolves({
      status: 'NOT_FOUND',
      data: { message: '"userId" not found' },
    });
    const request = {
      body: {
        userId: 10,
        productIds: [1, 2],
      }
    } as Request;
    await ordersController.create(request, res);
    expect(res.status).to.has.been.calledWith(404);
    expect(res.json).to.has.been.calledWith({ message: '"userId" not found' });
  });

  it('Caso de Sucesso para criar um pedido! - ORDERS', async function () {
    sinon.stub(ordersService, 'create').resolves({
      status: 'SUCCESSFUL',
      data: { userId: 2, productIds: [1, 2] },
    });
    const request = {
      body: {
        userId: 2,
        productIds: [1, 2],
      }
    } as Request;
    await ordersController.create(request, res);
    expect(res.status).to.has.been.calledWith(201);
    expect(res.json).to.has.been.calledWith({ userId: 2, productIds: [1, 2] });
  });
});
