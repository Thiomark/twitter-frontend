import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeScreen from '../pages/HomeScreen.vue'
import AuthScreen from '../pages/AuthScreen.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: AuthScreen,
        beforeEnter: (to, from, next) => {
            if(store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeScreen,
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Welcome' })
            }else {
                next()
            }
        }
    },
    {
        path: '/:username/status/:id',
        name: 'TwootScreen',
        component: () => import(/* webpackChunkName: "about" */ '../pages/TwootScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Welcome' })
            }else {
                next()
            }
        }
    },
    {
        path:"/notifications",
        name:"Notifications",
        component: () => import(/* webpackChunkName: "about" */ '../pages/NotificationScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/account/begin_password_reset",
        name:"ForgotPassword",
        component: () => import(/* webpackChunkName: "about" */ '../pages/ForgotPasswordScreen.vue'),
    },
    {
        path:"/messages",
        name:"Messages",
        component: () => import(/* webpackChunkName: "about" */ '../pages/MessageScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/find",
        name:"Search",
        component: () => import(/* webpackChunkName: "about" */ '../pages/SearchScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/messages/:id",
        name:"Chats",
        component: () => import(/* webpackChunkName: "about" */ '../pages/ChatScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/reply",
        name:"Reply",
        component: () => import(/* webpackChunkName: "about" */ '../pages/ReplyScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(!store.state.user.token || !store.state.twoots.twootReply){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/register",
        name:"Register",
        component: () => import(/* webpackChunkName: "about" */ '../pages/RegisterScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/login",
        name:"Login",
        component: () => import(/* webpackChunkName: "about" */ '../pages/LoginScreen.vue'),
        beforeEnter: (to, from, next) => {
            if(store.state.user.token){
                next({ name: 'Home' })
            }else {
                next()
            }
        }
    },
    {
        path:"/:id",
        name:"Profile",
        component: () => import(/* webpackChunkName: "about" */ '../pages/ProfileScreen.vue')
    },
    {
        path:"/:id/:tab",
        name:"Followers",
        component: () => import(/* webpackChunkName: "about" */ '../pages/FollowersScreen.vue')
    },
]

const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    mode: 'history',
    routes
})

export default router
