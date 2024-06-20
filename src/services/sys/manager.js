import {request} from 'umi';

// 以下是正常项目标准接口
export async function query(params) {
    return request('/user/findAll', {params});
}

export async function add(data) {
    return request('/user/create_user', {method: 'POST', data});
}

export async function update(data) {
    return request('/user/update', {method: 'POST', data});
}

export async function remove(data) {
    return request('/user/delete', {method: 'POST', data});
}

export async function updatePsd(data) {
    return request('/v2/sub/updatePwd', {method: 'PUT', data});
}