import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {
    body: {
      username: 'Hagar',
      password: 'terrivel',
    },
  } as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Caso de Sucesso! - LOGIN', async function () {
    sinon.stub(loginService, 'getUser').resolves({
      status: 'SUCCESSFUL',
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsInZvY2F0aW9uIjoiR3VlcnJlaXJvIiwibGV2ZWwiOjEwLCJwYXNzd29yZCI6IiQyYSQxMCROZ2RtMHF1Z0wybzF1V3dvbGZvdXJlaWc2dGZ6Wk1NTnZhZ0NKRzFRYS5IUW13RTFBRHl6aSIsImlhdCI6MTY5MjAzNDIxMn0.7lqA_gkAPQN-T3Dx-FRUYSStX2IOAokTEij0-sthV_w',
    });
    await loginController.getUser(req, res);

    expect(res.status).to.has.been.calledWith(200);
    expect(res.json).to.has.been.calledWith({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsInZvY2F0aW9uIjoiR3VlcnJlaXJvIiwibGV2ZWwiOjEwLCJwYXNzd29yZCI6IiQyYSQxMCROZ2RtMHF1Z0wybzF1V3dvbGZvdXJlaWc2dGZ6Wk1NTnZhZ0NKRzFRYS5IUW13RTFBRHl6aSIsImlhdCI6MTY5MjAzNDIxMn0.7lqA_gkAPQN-T3Dx-FRUYSStX2IOAokTEij0-sthV_w',
    });
  });

  it('Caso de Falha! - LOGIN', async function () {
    sinon.stub(loginService, 'getUser').resolves({
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    });
    req.body.password = '';
    await loginController.getUser(req, res);

    expect(res.status).to.has.been.calledWith(401);
    expect(res.json).to.has.been.calledWith({ message: 'Username or password invalid' });
  });
});
