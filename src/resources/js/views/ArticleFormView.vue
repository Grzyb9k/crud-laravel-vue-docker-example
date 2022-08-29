<template>
form
</template>

<script setup>

import useArticle from "../composables/useArticle";
import {onMounted} from "vue";

const { loadArticle } = useArticle();

onMounted(() => loadArticle)
</script>

<style scoped>

</style>
