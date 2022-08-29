import {storeToRefs} from "pinia";
import {useArticleStore, useAuthStore} from "../store";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

export default function useArticle() {
    const auth = useAuthStore(),
        {articles, article} = storeToRefs(useArticleStore()),
        route = useRoute(),
        router = useRouter();

    const fetchArticles = async () => {
            return await axios
                .get('api/articles', {
                    headers: auth.getApiHeaders,
                })
                .then(response => articles.value = response.data.articles)
                .catch(error => {
                    throw new Error(error);
                });
        },
        fetchArticle = async (id) => {
            return await axios
                .get('api/article/' + id, {
                    headers: auth.getApiHeaders,
                })
                .then(response => article.value = response.data.article)
                .catch(error => {
                    throw new Error(error);
                });
        },
        deleteArticle = async (id) => {
            await axios
                .delete("api/article" + "/" + id, {
                    headers: auth.getApiHeaders,
                }).catch(error => {
                    throw new Error(error);
                });
        },
        updateArticle = async () => {
            await axios
                .patch("api/article" + "/" + article.value.id, article.value, {
                    headers: auth.getApiHeaders,
                }).catch(error => {
                    throw new Error(error);
                });
        },
        insertArticle = async () => {
            await axios
                .post("api/article", article.value, {
                    headers: auth.getApiHeaders,
                }).catch(error => {
                    throw new Error(error);
                });
        },
        loadArticle = () => {
            if (route.params.id) {
                fetchArticle(route.params.id);
            }
        }


    return {
        fetchArticles,
        fetchArticle,
        insertArticle,
        deleteArticle,
        updateArticle,
        loadArticle

    }
}
