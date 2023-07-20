<script lang="ts" setup>
import type { RepliesResponse, Reply } from "../server/api/replies/[commentId]";

const props = defineProps<{
  commentId: string;
}>();

const displayReplies = ref(false);

const toggleDisplayReplies = () => {
  displayReplies.value = !displayReplies.value;
}

const { data: repliesData, execute: fetchReplies } = useFetch<RepliesResponse>(
  `/api/replies/${props.commentId}`
);

watchEffect(() => {
  if (displayReplies.value) fetchReplies();
});
</script>
<style>
.reply {
  display: block;
  padding: 10px 15px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
<template>
    <button v-show="!displayReplies" @click="toggleDisplayReplies">Show Replies</button>
    <button v-show="displayReplies" @click="toggleDisplayReplies">Hide Replies</button>
    <div v-show="displayReplies">
      <div class="reply" v-for="reply in repliesData.replies" :key="reply.id">
          {{ reply.author.login }} <relative-time :ts="reply.createdAt" />
          <div v-html="reply.bodyHTML"></div>
      </div>
    </div>
</template>