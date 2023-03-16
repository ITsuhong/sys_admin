import { request } from 'umi';

export async function login(data) {
  return request('/v2/userLogin/loginWeb', { method: 'POST', data });
}