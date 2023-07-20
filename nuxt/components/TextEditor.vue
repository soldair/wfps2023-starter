<script setup lang="ts">
const props = defineProps<{
  placeholder: string;
  action: string;
}>();

const expanded = ref(false);
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
    <textarea :placeholder=placeholder></textarea>
    <button>{{ action }}</button>
  </div>
</template>