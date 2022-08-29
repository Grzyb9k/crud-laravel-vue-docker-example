import { createWebHistory, createRouter } from "vue-router";
import {useAuthStore} from "../store";

import MainView from "../views/MainVIew"

export const routes = [
    {
        name: 'main',
        path: '/',
        component: MainView,
        meta: { guest: true },
    }
    ];

const router = createRouter({
    history: createWebHistory(),
    base: `${process.env.MIX_APP_URL}/admin/`,
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (auth.isAuthenticated) {
            next();
            return;
        }
        next({ name: "login" });
    } else if (to.matched.some(record => record.meta.guest)) {
        if (auth.isAuthenticated) {
            next("/admin/");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
