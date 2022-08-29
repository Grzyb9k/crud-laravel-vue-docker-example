import {storeToRefs} from "pinia";
import {useArticleStore, useAuthStore} from "../store";


export default function useArticle() {
   const { articles } = storeToRefs(useArticleStore());

    const fetchArticles = async () => {
        const auth = useAuthStore();
        await axios
            .get('api/articles', {
                headers: auth.getApiHeaders,
            })
            .then(response => {
                return response.data.articles;
            })
            .catch(error => {
                throw new Error(error);
            });
    }
   return {}
}
