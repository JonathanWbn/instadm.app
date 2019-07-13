<template>
  <div :class="['wrapper', item.isFromUser ? 'user' : 'friend']">
    <div v-if="item.isFromUser" class="message-preface">{{ userString }}</div>
    <div v-else class="message-preface">{{ friendString }}</div>
    <div v-if="item.reel_share.text" class="chat-message">{{ item.reel_share.text }}</div>
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
  computed: {
    userString() {
      switch (this.item.reel_share.type) {
        case 'reaction':
          return 'You reacted to their story.'
        case 'reply':
          return 'You replied to their story.'
        case 'mention':
          return 'You mentioned them in you story.'
        default:
          return ''
      }
    },
    friendString() {
      switch (this.item.reel_share.type) {
        case 'reaction':
          return `${this.friend.username} reacted to your story.`
        case 'reply':
          return `${this.friend.username} replied to your story.`
        case 'mention':
          return `${this.friend.username} mentioned you in their story.`
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.wrapper.friend {
  align-items: flex-start;
}

.wrapper.user {
  align-items: flex-end;
}
</style>

