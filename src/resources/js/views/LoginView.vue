<template>
    <div class="bg-animation-gradient flex flex-col w-full h-full p-10">
        <div
            class="m-auto p-10 bg-white shadow-lg rounded-lg w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4"
        >
            <h2 class="text-gray-800 text-3xl font-semibold">Zaloguj się</h2>
            <template v-if="error.length > 0">
                <div
                    v-for="(err, index) in error"
                    :key="index"
                    class="alert alert-warning mt-5"
                >
                    <div class="flex-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-6 h-6 mx-2 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
                            4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                        </svg>
                        <label> {{ err }}</label>
                    </div>
                </div>
            </template>
            <div class="mt-2 text-gray-600">
                <form @submit.prevent="submit">
                    <div class="form-control my-2">
                        <label for="email" class="label">
                            <span class="label-text">E-Mail Address</span>
                        </label>
                        <input
                            id="email"
                            v-model="email"
                            type="email"
                            class="input input-bordered"
                            required
                            autofocus
                            autocomplete="off"
                        />
                    </div>

                    <div class="form-control my-2">
                        <label for="password" class="label">
                            <span class="label-text"> Password </span>
                        </label>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            class="input input-bordered"
                            required
                            autocomplete="off"
                        />
                    </div>

                    <div class="form-control mt-10 items-end">
                        <button type="submit" class="btn btn-outline w-min">
                            Zaloguj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";


let email = ref(null),
    password = ref(null),
    error = ref([]);
const auth = useAuthStore();
const router = useRouter();


const submit = async () => {
    try {
        await auth.login({ email: email.value, password: password.value });
        await router.push("/admin/articles");
    } catch (e) {
        console.log(e.message);
        throw new Error(e);
    }
};
</script>

<style lang="scss" scoped>
.bg-animation-gradient {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100vh;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
