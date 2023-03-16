import { request } from 'umi';

export async function query(params) {
  return request('/project/findList', { params });
}
export async function add(data) {
  return request('/project/change', { method: 'POST', data });
}
export async function update(data) {
  return request('/project/change', { method: 'PUT', data });
}

export async function remove(params) {
  return request('/project/change', { method: 'DELETE', params });
}