import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: resolve => require(['../components/page/home/home.vue'], resolve)
        },
        {
            path: '/product',
            component: resolve => require(['../components/page/product/product.vue'], resolve)
        },
        {
            path: '/kub',
            component: resolve => require(['../components/page/kub/kub.vue'], resolve)
        },
        {
            path: '/message',
            component: resolve => require(['../components/page/message/message.vue'], resolve)
        },
        {
            path: '/contact',
            component: resolve => require(['../components/page/contact/contact.vue'], resolve)
        },
        {
            path: '/brand',
            component: resolve => require(['../components/page/product/brand/brand.vue'], resolve)
        },
        {
            path: '/news',
            component: resolve => require(['../components/page/news/news.vue'], resolve)
        },
    ]
})
