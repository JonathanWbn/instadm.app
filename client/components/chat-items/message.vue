<template>
  <div class="chat-message">{{ item.text }}</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
