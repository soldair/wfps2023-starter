<script lang="ts" setup>
import type { RepliesResponse, Reply } from "../server/api/replies/[commentId]";

const props = defineProps<{
  commentId: string;
}>();

const displayReplies = ref(false);
const loading = ref(false);

const repliesData = ref<Reply[]>([]);

const toggleDisplayReplies = async () => {
  displayReplies.value = !displayReplies.value;
}

watchEffect(async () => {
  if (displayReplies.value) {
    loading.value = true;
    const {data} = await useFetch<RepliesResponse>(`/api/replies/${props.commentId}`);
    repliesData.value = data.value?.replies || [];
    loading.value = false;
  }
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
    <div v-show="loading && !repliesData.length">Loading...</div>
    <div v-if="displayReplies">
      <div class="reply" v-for="reply in repliesData" :key="reply.id">
          {{ reply.author }} <relative-time :ts="reply.createdAt" />
          <div v-html="reply.bodyHTML"></div>
      </div>
    </div>
</template>