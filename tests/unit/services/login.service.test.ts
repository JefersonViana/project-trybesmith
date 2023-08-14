import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Caso de Sucesso - LOGIN', async function () {
    const userInstance = UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: '$2a$10$Ngdm0qugL2o1uWwolfoureig6tfzZMMNvagCJG1Qa.HQmwE1ADyzi',
    });
    sinon.stub(UserModel, 'findOne').resolves(userInstance);
    const responseService = await loginService.getUser({ username: 'Hagar', password: 'terrível' });

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    const payload = jwt.decode(responseService.data as any) as any;
    
    expect({
      id: payload.id,
      username: payload.username,
      vocation: payload.vocation,
      level: payload.level,
      password: payload.password,
    }).to.be.deep.equal({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: '$2a$10$Ngdm0qugL2o1uWwolfoureig6tfzZMMNvagCJG1Qa.HQmwE1ADyzi',
    });
  });
  
  it('Caso de Falha com password Inválido - LOGIN', async function () {
    const userInstance = UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: '$2a$10$Ngdm0qugL2o1uWwolfoureig6tfzZMMNvagCJG1Qa.HQmwE1ADyzi',
    });
    
    sinon.stub(UserModel, 'findOne').resolves(userInstance);
    const responseService = await loginService.getUser({ username: 'Hagar', password: 'invalid' });
    
    expect(responseService.status).to.be.equal('UNAUTHORIZED');
    expect(responseService.data).to.be.deep.equal({
      message: 'Username or password invalid',
    });
  });
  
  it('Caso de Falha com name Inválido - LOGIN', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const responseService = await loginService.getUser({ username: '', password: 'terrível' });

    expect(responseService.status).to.be.equal('UNAUTHORIZED');
    expect(responseService.data).to.be.deep.equal({
      message: 'Username or password invalid',
    });
  });
});
