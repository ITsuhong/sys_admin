export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    component: './Welcome'
  },
  {
    name: '系统设置',
    access: 'accessRoute',
    icon: 'setting',
    path: '/sys',
    routes: [
      {
        name: '模块管理',
        access: 'accessRoute',
        path: '/sys/module',
        component: './Sys/ModuleManage',
      },
      {
        name: '角色管理',
        access: 'accessRoute',
        path: '/sys/role',
        component: './Sys/RoleManage',
      },
      {
        name: '子管理员',
        access: 'accessRoute',
        path: '/sys/manager',
        component: './Sys/ChildManage',
      },
      {
        name: '系统参数',
        access: 'accessRoute',
        path: '/sys/params',
        component: './Sys/SysParams',
      },
    ]
  },
  {
    name:"内容管理",
    access: 'accessRoute',
    icon: 'table',
    path: '/cms',
    routes:[
      {
        name: '投诉建议',
        access: 'accessRoute',
        path: '/cms/ccrp',
        component: './Cms/Ccrp',
      },
      {
        name:"热词管理",
        access: 'accessRoute',
        path: '/cms/hot',
        component: './Cms/Hot',
      },
      {
        name:"项目管理",
        access: 'accessRoute',
        path: '/cms/project',
        component: './Cms/Project',
      },
      {
        name:"案例管理",
        access: 'accessRoute',
        path: '/cms/case',
        component: './Cms/Case',
      },
      {
        name:"问卷管理",
        access: 'accessRoute',
        path: '/cms/msq',
        component: './Cms/Msq',
      },
      {
        name:"用户管理",
        access: 'accessRoute',
        path: '/cms/user',
        component: './Cms/User',
      },
      {
        name:"广告管理",
        access: 'accessRoute',
        path: '/cms/advertis',
        component: './Cms/Advertis',
      }
    ]
  },
  {
    name: 'exception',
    path: '/exception',
    hideInMenu: true,
    routes: [
      // exception
      {
        path: '/exception/403',
        name: '403',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: '404',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: '500',
        component: './Exception/500',
      },
    ],
  },
  {
    path: '*',
    component: './Exception/404',
  },
]