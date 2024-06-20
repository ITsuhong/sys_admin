// https://umijs.org/config/
import {defineConfig} from '@umijs/max';
import defaultSettings from './defaultSettings';
import pageRoutes from './router.config';

export default defineConfig({
    base: '/',
    publicPath: '/admin/',
    favicons: ['/admin/logo.png'],
    hash: true,
    history: {type: 'hash'},
    antd: {
        // configProvider
        configProvider: {},
        // themes
        dark: false, // 开启暗色主题
        compact: false, // 开启紧凑主题
    },
    dva: {},
    layout: {},
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: pageRoutes,
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    externals: {},
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:3000/admin',
            // target: 'https://www.fastmock.site/mock/19502d36f214e49aeb0b29a39556846e/mock',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
    moment2dayjs: {},
    fastRefresh: true,
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
    model: {},
    request: {},
    access: {},
    initialState: {}, // access 插件依赖 initial State 所以需要同时开启
    deadCode: { //检测未使用的文件和导出
        failOnHint: false, //检测失败是否终止进程
        exclude: ['src/pages/document.ejs'],  //排除检测的范围
    },
    helmet: false, //不会集成 react-helmet-async同时构建产物也会减少相应的尺寸
});
