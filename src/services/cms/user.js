import { request } from 'umi';

export async function query(params) {
    return request('/user/findList', { params });
}
export async function update(data) {
    return request('/user/change', { method: 'PUT', data });
}
export async function findQuestionnaireList(params) {
    return request('/user/findQuestionnaireList', { params });
}
export async function findSubjectList(params) {
    return request('/user/findSubjectList', { params });
}