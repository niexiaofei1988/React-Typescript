import request from '../../utils/request';
import { stringify } from 'querystringify';

export interface loginParams {
  userName: string;
  password: string;
}

export async function loginService(params: loginParams) {
  return request.post('http://localhost:3000/user/login.json', stringify(params));
}
