<script lang="ts" setup>
import type { DiscussionResponse } from "../server/api/discussions/[number]";

const route = useRoute();

const { data } = await useFetch<DiscussionResponse>(
  `/api/discussions/${route.params.number}`,
);
</script>
<template>
  <section>
    <h1>{{ data.discussion.title }}</h1>
    <p>
      {{ data.discussion.author }}
      <relative-time :ts="data.discussion.createdAt" />
    </p>
    <div v-html="data.discussion.bodyHTML"></div>
    <div class="reactions">
      <emoji-reactions :groups="data.discussion.reactionGroups" />
    </div>
    <div class="comments">
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in data.discussion.comments" :key="comment.id">
          {{ comment.author }} <relative-time :ts="comment.createdAt" />
          <div v-html="comment.bodyHTML"></div>
          <ul>
            <li v-for="reply in comment.replies" :key="reply.id">
              {{ reply.author }} <relative-time :ts="reply.createdAt" />
              <div v-html="reply.bodyHTML"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
