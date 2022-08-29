<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-5 mx-auto">
            <div class="flex flex-wrap -m-4">
                <ArticleSkeleton v-if="isLoading" v-for="loaderIndex in 10" :key="loaderIndex"/>
                <ArticleError v-else-if="error" :error="error" v-for="errorIndex in 10" :key="errorIndex" />
                <Article v-else v-for="article in articles" :article="article"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import {onErrorCaptured, onMounted, ref} from 'vue';
import ArticleError from "../components/ArticleError";
import Article from "../components/Article";
import ArticleSkeleton from "../components/ArticleSkeleton";
import {storeToRefs} from "pinia";

import {useArticleStore} from "../store";

const {fetchArticles} = useArticleStore(),
    error = ref(null),
    isLoading = ref(true),
    {articles} = storeToRefs(useArticleStore());

onErrorCaptured(e => {
    error.value = e
    return false
});

onMounted(async () => {
    try {
        isLoading.value = true
        articles.value = await fetchArticles()
    } catch (e) {
        error.value = e
    } finally {
        isLoading.value = false
    }
})
</script>
