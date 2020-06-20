import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login.vue';

Vue.use(VueRouter);
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/story/storyList',
        component: () => import('../views/layout'),
        children: [
            {
                path: '/story/storyList',
                name: 'storyList',
                component: () => import('../views/story/storyList'),
            },
            {
                path: '/user/collection',
                name: 'collection',
                component: () => import('../views/user/my-collection'),
            }
            // eslint-disable-next-line no-mixed-spaces-and-tabs
        ],
    },
    {
        path: '/storyContent/:id',
        name: 'storyContent',
        component: () => import('../views/layout'),
        children: [
            {
                path: '/storyContent/:id',
                name: 'storyContent',
                component: () => import('../views/story/storyContent'),
            },

        ],
    },
    {
        path: '/myStory',
        name: 'myStory',
        component: () => import('../views/layout'),
        children: [
            {
                path: '/myStory',
                name: 'myStory',
                component: () => import('../views/user/my-story'),
            },

        ],
    },

    {
        path: '/home',
        name: 'home',
        redirect: '/user/info',
        component: () => import('../views/layout'),
        children: [
            {
                path: '/user/info',
                name: 'info',
                component: () => import('../views/user/info'),
            },

        ],
    },
];
const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes,
});
const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
