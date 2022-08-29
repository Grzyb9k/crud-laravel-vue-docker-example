<template>
    <article class="p-4 md:w-1/3" >
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div class="w-full">
                <div class="w-full flex p-2">
                    <div class="p-2 ">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/Tcc_img%2Flogo.png?alt=media&token=5e5738c4-8ffd-44f9-b47a-57d07e0b7939" alt="author"
                            class="w-10 h-10 rounded-full overflow-hidden"/>
                    </div>
                    <header class="pl-2 pt-2 ">
                        <p class="font-bold">{{ article.title }}</p>
                        <p class="text-xs">{{ article.created }}</p>
                    </header>
                </div>
            </div>


            <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://picsum.photos/300/200" alt="blog cover"/>

            <main class="p-4">
                <h1 class="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase "> {{ article.author.name}} </h1>
                <h2 v-if="isAuthenticated"> <a :href="'/admin/article/'+article.id"><span class="flex flex-row">edytuj artykuł <svg class="svg-icon ml-3" viewBox="0 0 20 20">
                    <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
                </svg></span></a></h2>
                <p class="text-lg text-gray-900 mb-3">{{ article.content }}</p>
            </main>
        </div>
    </article>
</template>

<script setup>
import {useAuthStore} from "../store";

const { isAuthenticated } = useAuthStore();
const props = defineProps({
    article: {
        type: Object,
        default: null,
    },
});
</script>


