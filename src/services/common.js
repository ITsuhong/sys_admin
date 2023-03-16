import { request } from 'umi';
// 项目管理下拉框
export async function findSelectList(params) {
    return request('/project/findSelectList', { params });
  }