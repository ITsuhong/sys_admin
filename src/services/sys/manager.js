import { request } from 'umi';

// 以下是正常项目标准接口
export async function query(params) {
  return request('/v2/sub/administrator', { params });
}
export async function add(data) {
  return request('/v2/sub/administrator', { method: 'POST', data });
}
export async function update(data) {
  return request('/v2/sub/administrator', { method: 'PUT', data });
}
export async function remove(params) {
  return request('/v2/sub/administrator', { method: 'DELETE', params });
}
export async function updatePsd(data) {
  return request('/v2/sub/updatePwd', { method: 'PUT', data });
}