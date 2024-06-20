import {request} from 'umi';

//获取登录人菜单
export async function queryLoginModules(params) {
    return request('/user/routesTree', {params});
}

export async function queryTree(params) {
    return request('/routes-module/findAll', {params});
}

export async function add(data) {
    return request('/routes-module/create', {method: 'POST', data});
}

export async function update(data) {
    return request('/routes-module/update', {method: 'POST', data});
}

export async function remove(data) {
    return request('/routes-module/delete', {method: 'POST', data});
}