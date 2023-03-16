import { request } from 'umi';

// 问卷
export async function query(params) {
  return request('/questionnaire/findList', { params });
}
export async function add(data) {
  return request('/questionnaire/change', { method: 'POST', data });
}
export async function update(data) {
  return request('/questionnaire/change', { method: 'PUT', data });
}

export async function remove(params) {
  return request('/questionnaire/change', { method: 'DELETE', params });
}
// 题目管理
export async function querySubject(params) {
  return request('/questionnaireSubject/findList', { params });
}
export async function addSubject(data) {
  return request('/questionnaireSubject/change', { method: 'POST', data });
}
export async function updateSubject(data) {
  return request('/questionnaireSubject/change', { method: 'PUT', data });
}
export async function removeSubject(params) {
  return request('/questionnaireSubject/change', { method: 'DELETE', params });
}