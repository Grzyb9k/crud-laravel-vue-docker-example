import axios from "axios";
import { defineStore } from "pinia";

export default defineStore({
    id: "useAuthStore",
    state: () => ({
        token: JSON.parse(localStorage.getItem("token")) /* CSRF Token */,
        user: JSON.parse(localStorage.getItem("user")),
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
            )}`,
        },
    }),
    getters: {
        isAuthenticated: state => !!state.token,
        getAuthUser: state => state.user,
        getAuthToken: state => state.token,
        getApiHeaders: state => state.headers,
    },
    actions: {
        async login(user) {
            await axios
                .post("api/login", user)
                .then(response => {
                    this.user = response.data.user;
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    this.token = response.data.access_token;
                    localStorage.setItem(
                        "token",
                        JSON.stringify(response.data.access_token)
                    );
                    this.headers.Authorization = `Bearer ${response.data.access_token}`;
                })
                .catch(error => {
                    throw new Error(error);
                });
        },
        async logout() {
            await axios
                .post(
                    "logout",
                    {},
                    {
                        headers: this.headers,
                    }
                )
                .then(
                    () => {
                        this.user = null;
                        this.token = null;
                        this.headers.Authorization = null;
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        this.$router.push("/");
                    },
                    error => {
                        throw new Error(error);
                    }
                );
        },
    },
});
