import { createWebHistory, createRouter } from "vue-router";
import {useAuthStore} from "../store";

import MainView from "../views/MainView"
import LoginView from "../views/LoginView"
import ArticleFormView from "../views/ArticleFormView";
import ArticleIndexView from "../views/ArticleIndexView";
export const routes = [
    {
        name: 'main',
        path: '/',
        component: MainView,
        meta: { guest: true },
    },
    {
        name: "login",
        path: "admin/login",
        component: LoginView,
        meta: { guest: true },
    },
    {
        name: "article-index",
        path: "/admin/articles",
        component: ArticleIndexView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name: "article-form",
        path: "/admin/article/:id?",
        component: ArticleFormView,
        meta: {
            requiresAuth: true,
        },
    },
    ];

const router = createRouter({
    history: createWebHistory(),
    base: `${process.env.MIX_APP_URL}`,
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
