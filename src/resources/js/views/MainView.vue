<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-5 mx-auto">
            <div class="flex flex-wrap -m-4">
                <ArticleSkeleton v-if="isLoading" v-for="loaderIndex in 10" :key="loaderIndex"/>
                <ArticleError v-else-if="error" :error="error" v-for="errorIndex in 10" :key="errorIndex" />
                <Article v-else v-for="article in paginatedArticles" :article="article"/>
            </div>
            <Paginator
                :current="currentPage"
                :total="totalPages"
                :page-size="pageSize"
                @set-page="currentPage = $event"
            />
        </div>
    </section>
</template>

<script setup>
import {computed, onErrorCaptured, onMounted, ref} from 'vue';
import ArticleError from "../components/ArticleError";
import Article from "../components/Article";
import ArticleSkeleton from "../components/ArticleSkeleton";
import {storeToRefs} from "pinia";

import useArticle from "../composables/useArticle";
import {useArticleStore} from "../store";
import Paginator from  "../components/Paginator";

const {fetchArticles} = useArticle(),
    error = ref(null),
    isLoading = ref(true),
    currentPage = ref(1),
    pageSize = ref(9),
    {articles} = storeToRefs(useArticleStore());

onErrorCaptured(e => {
    error.value = e
    return false
});

const totalPages = computed(() => parseInt(Math.ceil(articles.value.length / pageSize.value), 10));

const paginatedArticles = computed(() => {
    return articles.value.filter((row, index) => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = currentPage.value * pageSize.value;
        if (index >= start && index < end) return true;
    });
});

onMounted(async () => {
    try {
        isLoading.value = true;
        articles.value =  await fetchArticles();
    } catch (e) {
        error.value = e
    } finally {
        isLoading.value = false
    }
})
</script>
