<template>
  <div>
    <Markdown :source="source" :html="true" />
  </div>
  <textarea v-model="source"></textarea>
</template>

<script setup>
import Markdown from "vue3-markdown-it";
import { ref } from "vue";

const source = ref("y");
const props = defineProps(["source"]);
</script>
