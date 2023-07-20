<script lang="ts" setup>
import { ref, onMounted } from 'vue'
//import {useUser} from '../composables/use-user';
let user = await useUser() as Ref<any>;
/*
onMounted(async ()=>{
    user.value = 
    console.log('user data from useUser',unref(user).name);
})
*/
let polling:Timeout|false = false;
const poll = async ()=>{
    if(polling !== false){
        return;
    }
    console.log('starting poll');
    let count = 0;
    const fetch = async ()=>{
        count++;
        const updatedUser = await useUser()
        if(updatedUser.value.name){
            user.value = updatedUser.value;
            return;
        }

        setTimeout(()=>{
            if(count >= 10){
                // give up. use abandoned login.
                // we could so a long request to an api endpoint if we had webhooks enabled probably.
                return;
            }
            fetch()
        },2000);
    }
    fetch();
}

</script>
<template>
    <div v-if="!user">
        loading
    </div>
    <div v-else-if="user.login_link">
        <a target="_blank" :href="`${user.login_link}`" @click="poll">Login</a>
    </div>
    <div v-else>
        Hello {{ unref<any>(user).name }}! <a href="/api/logout" @click="user.value = null">logout</a>
    </div>
</template>