<template>
  <div v-html="content" class="markdown-body">
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'

export default {
  props: ['content']
}
</script>
