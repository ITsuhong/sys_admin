import { request } from 'umi';

export async function query(params) {
  return request('/banner/findList', { params });
}
export async function add(data) {
  return request('/banner/change', { method: 'POST', data });
}
export async function update(data) {
  return request('/banner/change', { method: 'PUT', data });
}

export async function remove(params) {
  return request('/banner/change', { method: 'DELETE', params });
}