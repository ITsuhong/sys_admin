import { request } from 'umi';


// 以下是正常项目标准接口

export async function query(params) {
  return request('/roles/findAll', { params });
}
export async function add(data) {
  return request('/roles/create', { method: 'POST', data });
}
export async function update(data) {
  return request('/roles/update', { method: 'POST', data });
}
export async function remove(data) {
  return request('/roles/delete', { method: 'POST', data });
}
