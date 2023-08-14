import bcrypt from 'bcryptjs';

import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { UserRequest } from '../types/User';
import generateToken from '../utils/generateToken';

async function getUser(
  user: UserRequest,
): Promise<ServiceResponse<string>> {
  const { username, password } = user;
  
  let responseService: ServiceResponse<string>;
  const findUser = await UserModel.findOne({ where: { username } });
  if (!findUser) {
    responseService = { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
    return responseService;
  }
  
  if (!bcrypt.compareSync(password, findUser.dataValues.password)) {
    responseService = { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
    return responseService;
  }
  
  const token = generateToken(findUser.dataValues);

  responseService = { status: 'SUCCESSFUL', data: token };
  return responseService;
}

export default {
  getUser,
};

// if (!username || !password) {
//   responseService = {
//     status: 'INVALID_DATA',
//     data: { message: '"username" and "password" are required' },
//   };
//   return responseService;
// }