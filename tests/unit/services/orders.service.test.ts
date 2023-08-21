import { expect, use } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import { allOrdersForComparison, allOrdersForComparisonArrEmply, allOrdersFromDb } from '../../mocks/orders.mock';
import ordersService from '../../../src/services/orders.service';
import ProductModel from '../../../src/database/models/product.model';
import user from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';
import { mockUser } from '../../mocks/user.mock';
import sequelize from '../../../src/database/models';

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

  it('Caso de Falha com userId não existente! - CREATE ORDERS', async function () {
    sinon.stub(user, 'getUserById').resolves(null);
    const responseService = await ordersService.create(10, [1,2]);
    
    expect(responseService.status).to.be.deep.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: '"userId" not found' });
  });

  it('Caso de Sucesso com userId existente! - CREATE ORDERS', async function () {
    const userInstance = UserModel.build(mockUser);
    const orderInstance = OrderModel.build({ id: 4, userId: 1 });
    sinon.stub(user, 'getUserById').resolves(userInstance);

    sinon.stub(UserModel, 'create').resolves(orderInstance);
    sinon.stub(ProductModel, 'update').resolves();
    const responseService = await ordersService.create(1, [1, 2]);
    
    expect(responseService.status).to.be.deep.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal({ userId: 1, productIds: [1, 2] });
  });
});
