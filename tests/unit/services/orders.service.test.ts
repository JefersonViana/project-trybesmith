import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import { allOrdersForComparison, allOrdersForComparisonArrEmply, allOrdersFromDb } from '../../mocks/orders.mock';
import ordersService from '../../../src/services/orders.service';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Caso de Sucesso! - GET ALL ORDERS', async function () {
    // const productInstance = allOrdersFromDb.map((prod) => {
    //   return OrderModel.build({ id: prod.id , userId: prod.userId, productIds: prod.productIds.map((p) => ProductModel.build(p)) });
    // })
    
    sinon.stub(OrderModel, 'findAll').resolves(allOrdersFromDb as any);
    const responseService = await ordersService.list();
    
    expect(responseService.status).to.be.deep.equal('SUCCESSFUL');
    expect(responseService.data).to.have.length(3);
    expect(responseService.data).to.be.deep.equal(allOrdersForComparison);
  });

  it('Caso de Sucesso! - GET ALL ORDERS', async function () {
    const productInstance = allOrdersForComparisonArrEmply.map((prod) => OrderModel.build({ id: prod.id , userId: prod.userId }))
    
    sinon.stub(OrderModel, 'findAll').resolves(productInstance);
    const responseService = await ordersService.list();
    
    expect(responseService.status).to.be.deep.equal('SUCCESSFUL');
    expect(responseService.data).to.have.length(3);
    expect(responseService.data).to.be.deep.equal(allOrdersForComparisonArrEmply);
  });
});
