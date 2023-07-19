<script lang="ts" setup>
import type { Reply } from "../server/api/discussions/[number]";

const props = defineProps<{
  replies: Reply[];
}>();

const displayReplies = ref(false);

const toggleDisplayReplies = () => {
  displayReplies.value = !displayReplies.value;
}
</script>
<template>
    <button @click="toggleDisplayReplies">Show Replies</button>
    <ul v-show="displayReplies">
    <li v-for="reply in props.replies" :key="reply.id">
        {{ reply.author }} <relative-time :ts="reply.createdAt" />
        <div v-html="reply.bodyHTML"></div>
    </li>
    </ul>
</template>