<template>
    <ArticleError v-if="error" :error="error" />
    <Suspense v-else>
        <Article />
        <template #fallback>
            <ArticleSkeleton />
        </template>
    </Suspense>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';
import ArticleError from "./ArticleError";
import Article from  "./Article";
import ArticleSkeleton from "./ArticleSkeleton";

const error = ref(null);
onErrorCaptured(e => {
    error.value = e
    return false
});

</script>

<style scoped>

</style>
