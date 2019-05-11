<template>
  <div class="chat-container">
    <div
      v-for="item in items"
      :key="item.item_id"
      class="chat-item"
      :class="{ 'user-item': item.user_id !== friends[0].pk, 'friend-item': item.user_id === friends[0].pk }"
    >
      <div v-if="item.item_type === 'text'" class="message">{{ item.text }}</div>
      <div
        class="message-preface"
        v-if="item.reel_share"
      >{{ item.reel_share.type === 'reaction' ? 'You reacted to their story' : 'You replied to their story' }}</div>
      <div v-if="item.item_type === 'reel_share'" class="message">{{ item.reel_share.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    friends: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-item {
  margin: 5px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.message {
  padding: 5px 15px;
  border-radius: 20px;
  line-height: 26px;
}

.message-preface {
  color: grey;
  margin-bottom: 3px;
}

.friend-item {
  align-self: flex-start;
  align-items: flex-start;
}

.user-item {
  align-self: flex-end;
  align-items: flex-end;
}

.friend-item .message {
  background-color: lightgray;
  color: black;
}

.user-item .message {
  background-color: blue;
  color: white;
}
</style>
