import { request } from 'umi';

export async function query(params) {
  return request('/hotSearch/findList', { params });
}

export async function add(data) {
  return request('/hotSearch/change', { method: 'POST', data });
}

export async function update(data) {
  return request('/hotSearch/change', { method: 'PUT', data });
}

export async function remove(params) {
  return request('/hotSearch/change', { method: 'DELETE', params });
}