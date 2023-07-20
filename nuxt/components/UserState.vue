<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {useUser} from '../composables/use-user';
let user:any = null;
onMounted(async ()=>{
    user = await useUser() as Ref<any>;
    console.log('user data from useUser',unref(user));
})
</script>
<template>
    <div v-if="!user">
        loading
    </div>
    <div v-else-if="user.login_link">
        <a href="`${user.login_link}`">Login</a>
    </div>
    <div v-else>
        Hello {{ unref<any>(user).name }}! <a href="#">logout</a>
    </div>
</template>