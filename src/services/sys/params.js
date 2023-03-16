import { request } from 'umi';


export async function query(params) {
  return request('/v2/code/sys', { params });
}
export async function update(data) {
  return request('/v2/code/sys', { method: 'PUT', data });
}