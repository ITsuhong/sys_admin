import { request } from 'umi';

export async function query(params) {
  return request('/feedback/findList', { params });
}
export async function queryInfo(params) {
    return request('/feedback/findById', { params });
  }
