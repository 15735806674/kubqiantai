import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/calculator'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                // {
                //     path: '/dashboard',
                //     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                //     meta: { title: '系统首页' }
                // },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/userInfo/userInfo.vue'], resolve),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/ding',
                    component: resolve => require(['../components/page/ding/ding.vue'], resolve),
                    meta: { title: '同步钉钉' }
                },
                {
                    path: '/configuration',
                    component: resolve => require(['../components/page/configuration/configuration.vue'], resolve),
                    meta: { title: '配置优惠信息' }
                },
                {
                    path: '/calculator',
                    component: resolve => require(['../components/page/calculator/calculator.vue'], resolve),
                    meta: { title: '计算器' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
       
    ]
})
