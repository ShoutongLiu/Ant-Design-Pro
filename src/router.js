import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notfound from './views/404.vue'

Vue.use(Router);

const routers = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
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
                    component: { render: h => h('router-view') },
                    children: [
                        {
                            path: '/dashboard/analysis',
                            name: 'analysis',
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue")
                        }
                    ]
                },
                // form
                {
                    path: '/form',
                    name: 'form',
                    component: { render: h => h('router-view') },
                    children: [
                        {
                            path: '/form/basic-form',
                            name: 'basicform',
                            component: () =>
                                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue")
                        },
                        {
                            path: '/form/step-form',
                            name: 'stepform',
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
                        import(/*login */ "./views/user/Login.vue")
                },
                {
                    path: '/user/register',
                    name: 'register',
                    component: () =>
                        import(/* register*/ "./views/user/Register.vue")
                }
            ]
        },
        {
            path: '*',
            name: 'notfound',
            component: notfound
        }
    ]
});

routers.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        NProgress.start()
    }
    next()
})

routers.afterEach(() => {
    NProgress.done()
})

export default routers