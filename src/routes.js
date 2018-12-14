import Home from './assets/vue/pages/home.vue';
import AboutPage from './assets/vue/pages/about.vue';
import FormPage from './assets/vue/pages/form.vue';
import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';

import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import ColorThemes from './assets/vue/pages/color-themes.vue';
import Chat from './assets/vue/pages/chat.vue';
import Vuex from './assets/vue/pages/vuex.vue';
import main from 'pages/main/main.vue'
import userInfo from './assets/js/userInfo.js';

function checkLogin(routeTo, routeFrom, resolve, reject) {
    console.log(routeTo.route);
    if (userInfo.checkLoginStatus()) {
        resolve({ component: AboutPage });
    } else {
        // resolve({ componentUrl: routeTo.route });
        // resolve(routeTo.route);
        resolve({
            loginScreen: {
                component: main
            }
        });
    }
}

// function checkLogin(route, resolve, reject) {
//     console.log(route);
//     if (userInfo.checkLoginStatus()) {
//         resolve({ component: AboutPage });
//     } else {
//         // resolve({ component: FormPage });
//         resolve('/form/');
//     }
// }

export default [

    {
        path: '/',
        component: main
    },
    {
        path: '/home/',
        component: Home
    },
    {
        path: '/about/',
        // component: AboutPage,
        //异步路由
        async: checkLogin,
        //重定向
        // redirect: checkLogin,
        on: {
            pageBeforeIn: function(event, page) {
                // do something before page gets into the view
                console.log("pageBeforeIn");
            },
            pageAfterIn: function(event, page) {
                // do something after page gets into the view
                console.log("pageAfterIn");
            },
            pageInit: function(event, page) {
                // do something when page initialized
                console.log("pageInit");
            },
            pageBeforeRemove: function(event, page) {
                // do something before page gets removed from DOM
                console.log("pageBeforeRemove");
            },
        },
        beforeEnter: function(routeTo, routeFrom, resolve, reject) {
            resolve();
        },
        beforeLeave: function(routeTo, routeFrom, resolve, reject) {
            resolve();
        },
    },
    {
        path: '/form/',
        component: FormPage,
        name: "胡海潮"
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage
    },
    {
        path: '/panel-left/',
        component: PanelLeftPage
    },
    {
        path: '/color-themes/',
        component: ColorThemes
    },
    {
        path: '/chat/',
        component: Chat
    },
    {
        path: '/vuex/',
        component: Vuex
    },
]