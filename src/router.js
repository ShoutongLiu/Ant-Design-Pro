import Vue from "vue";
import Router from "vue-router";
import findLast from 'lodash/findLast'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notfound from './views/404.vue'
import Forbidden from './views/403.vue'
import { check, isLogin } from './utils/auth'

Vue.use(Router);

const routers = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            meta: { authority: ['user', 'admin'] },
            component: () =>
                import(/* webpackChunkName: "dashboard" */ "./layouts/BasicLayout.vue"),
            children: [
                // dashboard
                {
                    path: '/',
                    redirect: '/dashboard/analysis'
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: { icon: 'dashboard', title: '仪表盘' },
                    component: { render: h => h('router-view') },
                    children: [
                        {
                            path: '/dashboard/analysis',
                            name: 'analysis',
                            meta: { title: '分析页' },
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue")
                        }
                    ]
                },
                // form
                {
                    path: '/form',
                    name: 'form',
                    meta: { icon: 'form', title: '表单', authority: ['admin'] },
                    component: { render: h => h('router-view') },
                    children: [
                        {
                            path: '/form/basic-form',
                            name: 'basicform',
                            meta: { title: '基础表单' },
                            component: () =>
                                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue")
                        },
                        {
                            path: '/form/step-form',
                            name: 'stepform',
                            meta: { title: '分布表单' },
                            hideChildrenInMenu: true,
                            component: () =>
                                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
                            children: [
                                {
                                    path: '/form/step-form',
                                    rediret: '/form/step-form/info'
                                },
                                {
                                    path: '/form/step-form/info',
                                    name: 'info',
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue"),
                                },
                                {
                                    path: '/form/step-form/confirm',
                                    name: 'confirm',
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue"),
                                },
                                {
                                    path: '/form/step-form/result',
                                    name: 'result',
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue"),
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            path: '/user',
            hideInMenu: true,
            component: () =>
                import(/* userlayout */ './layouts/UserLayout.vue'),
            children: [
                {
                    path: '/user',
                    redirect: '/user/login'
                },
                {
                    path: '/user/login',
                    name: 'login',
                    component: () =>
                        import(/*login */ "./views/User/Login.vue")
                },
                {
                    path: '/user/register',
                    name: 'register',
                    component: () =>
                        import(/* register*/ "./views/User/Register.vue")
                }
            ]
        },
        {
            path: '/403',
            name: '403',
            hideInMenu: true,
            component: Forbidden,
        },
        {
            path: '*',
            name: 'notfound',
            hideInMenu: true,
            component: notfound
        }
    ]
});

routers.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        NProgress.start()   // 刷新进度条
    }
    const record = findLast(to.matched, record => record.meta.authority)
    if (record && !check(record.meta.authority)) {
        if (!isLogin() && to.path !== '/user/login') {
            next({
                path: '/user/login'
            })
        } else if (to.path !== '/403') {
            next({
                path: '/403'
            })
        }
        NProgress.done()
    }
    next()
})

routers.afterEach(() => {
    NProgress.done()
})

export default routers