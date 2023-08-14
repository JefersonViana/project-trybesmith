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

});
