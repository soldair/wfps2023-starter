<script setup lang="ts">
  let data = "";
  if(process.server){
    const config = useRuntimeConfig();
    data = config.github.appConfig.oauth.clientId;
  }
</script>
<template>
    <section>
    <hr/>
    <a :href="`https://github.com/login/oauth/authorize?client_id=${data}`">Login with GitHub</a>
    <hr/>
    </section>
</template>