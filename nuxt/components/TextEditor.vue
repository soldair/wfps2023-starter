<script setup lang="ts">
const props = defineProps<{
  placeholder: string;
  action: string;
}>();

const text = ref('');
</script>
<style>
.editor {
  display: block;
  padding: 4px;
  text-align: right;
}

.editor > textarea {
  display: block;
  outline: 0;
  width: 100%;
  border: 1px solid #888;
  color: #333;
}

.editor > button {
  margin: 8px 0;
  padding: 3px 10px;
}
</style>
<template>
  <div class="editor">
    <textarea :placeholder=placeholder v-model="text"></textarea>
    <button :disabled="text === ''" @click="$emit('submit', text)">{{ action }}</button>
  </div>
</template>