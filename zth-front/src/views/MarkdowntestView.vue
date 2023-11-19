<template>
  <div>
    <Markdown :source="source" :html="true" />
  </div>
  <textarea v-model="source"></textarea>
</template>

<script setup>
import Markdown from "vue3-markdown-it";
import { ref } from "vue";

import "highlight.js/styles/github.css";

const source = ref("```python\nconst x = 5;\n```");
</script>
