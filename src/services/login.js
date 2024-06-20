import { request } from 'umi';

export async function login(data) {
  return request('/login', { method: 'POST', data });
}