<script lang="ts" setup>
import type { RepliesResponse, Reply } from "../server/api/discussions/[number]/replies/[commentId]";

const props = defineProps<{
  discussionId: number;
  commentId: string;
}>();

const displayReplies = ref(false);

const toggleDisplayReplies = () => {
  displayReplies.value = !displayReplies.value;
}

const { data: repliesData } = await useFetch<RepliesResponse>(
  `/api/discussions/${props.discussionId}/replies/${props.commentId}`
);
</script>
<template>
    <button @click="toggleDisplayReplies">Show Replies</button>
    <ul v-show="displayReplies">
    <li v-for="reply in repliesData.replies" :key="reply.id">
        {{ reply.author }} <relative-time :ts="reply.createdAt" />
        <div v-html="reply.bodyHTML"></div>
    </li>
    </ul>
</template>