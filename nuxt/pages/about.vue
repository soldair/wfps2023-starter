<script lang="ts" setup>
const {data} = await useFetch<string>("/api/about");
</script>
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <p>The app was built at {{ data }}</p>
  </section>
</template>
