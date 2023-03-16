import { request } from 'umi';

export async function query(params) {
  return request('/projectCase/findList', { params });
}
export async function add(data) {
  return request('/projectCase/change', { method: 'POST', data });
}
export async function update(data) {
  return request('/projectCase/change', { method: 'PUT', data });
}
export async function remove(params) {
  return request('/projectCase/change', { method: 'DELETE', params });
}
