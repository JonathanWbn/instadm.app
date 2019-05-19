<template>
  <div class="reel-share-wrapper">
    <div
      v-if="item.isFromUser"
      class="message-preface"
    >You {{ item.reel_share.type === 'reaction' ? 'reacted' : 'replied' }} to their story.</div>
    <div
      v-else
      class="message-preface"
    >{{ friend.username }} {{ item.reel_share.type === 'reaction' ? 'reacted' : 'replied' }} to your story.</div>
    <div class="message">{{ item.reel_share.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    friend: {
      type: Object,
      required: true,
    },
  },
}
</script>
