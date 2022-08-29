<template>
    <div class="w-full flex my-5">
        <div class="btn-group mx-auto">
            <button v-if="current > 1" class="btn" @click="prevPage">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                </svg>
            </button>
            <template v-if="total > 1">
                <button
                    v-for="page in pagination"
                    :key="page"
                    :class="{
                        'cursor-default border-0':
                            current === page,
                        'cursor-default': !page,
                    }"
                    class="btn"
                    @click="
                        current === page || page.length === 0
                            ? ''
                            : $emit('setPage', page)
                    "
                >
                    {{ page ?? "..." }}
                </button>
            </template>
            <button v-if="current < total" class="btn" @click="nextPage">
                <svg class="svg-icon" viewBox="0 0 20 20">
                    <path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";

const paginatorSize = ref(4);
const prop = defineProps({
        current: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
    }),
    emit = defineEmits(['setPage']);

const pagination = computed(() => {
    const res = [];
    const minPaginationElems = 5 + paginatorSize.value * 2;
    let rangeStart =
        prop.total <= minPaginationElems
            ? 1
            : prop.current - paginatorSize.value;
    let rangeEnd =
        prop.total <= minPaginationElems
            ? prop.total
            : prop.current + paginatorSize.value;
    rangeEnd = rangeEnd > prop.total ? prop.total : rangeEnd;
    rangeStart = rangeStart < 1 ? 1 : rangeStart;
    if (prop.total > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = prop.total - rangeEnd < 3;
        if (isStartBoundaryReached) {
            rangeEnd = minPaginationElems - 2;
            for (let i = 1; i < rangeStart; i++) {
                res.push(i);
            }
        } else {
            res.push(1);
            res.push(null);
        }
        if (isEndBoundaryReached) {
            rangeStart = prop.total - (minPaginationElems - 3);
            for (let i = rangeStart; i <= prop.total; i++) {
                res.push(i);
            }
        } else {
            for (let i = rangeStart; i <= rangeEnd; i++) {
                res.push(i);
            }
            res.push(null);
            res.push(prop.total);
        }
    } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
        }
    }
    return res;
});

const nextPage = () => {
        emit("setPage", prop.current + 1);
    },
    prevPage = () => {
        emit("setPage", prop.current - 1);
    };

</script>

<style scoped>

</style>
