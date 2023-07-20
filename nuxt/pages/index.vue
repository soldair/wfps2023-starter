<script lang="ts" setup>
import type { DiscussionListResponse } from "../server/api/discussions";

const { data } = await useFetch<DiscussionListResponse>("/api/discussions");
</script>
<style>
.discussions {
  padding: 10px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
}

.discussions h2 {
  font-size: 1.25em;
}

.discussions h2 a {
  text-decoration: none;
}
.discussions h2 a:hover {
  text-decoration: underline;
}
</style>
<template>
  <section class="discussions">
    <h1>Discussions</h1>
    <div v-if="data">
      <div v-for="discussion in data.discussions" :key="discussion.id">
        <h2>
          <NuxtLink :href="`/discussions/${discussion.number}`">{{
            discussion.title
          }}</NuxtLink>
        </h2>
        <p>
          {{ discussion.author }} started
          <relative-time :ts="discussion.createdAt" />
        </p>
      </div>
    </div>
  </section>
</template>
