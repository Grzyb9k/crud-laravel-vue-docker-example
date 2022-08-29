import axios from "axios";
import { defineStore } from "pinia";

const defaultModels = {
    article: {
        id: null,
        title: null,
        content: null,
        created: null,
        author: null
    }
};

export default defineStore({
    id: "useArticleStore",
    state: () => ({
        article: defaultModels.article,
        articles: [],
    })
});
