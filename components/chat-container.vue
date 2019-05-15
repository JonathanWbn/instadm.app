<template>
  <div class="chat-container">
    <div
      v-for="(item, index) in items"
      :key="item.item_id"
      class="chat-item"
      :class="{ 'user-item': item.user_id !== friend.pk, 'friend-item': item.user_id === friend.pk }"
    >
      <div class="message-wrapper">
        <img
          v-if="item.user_id === friend.pk && (!items[index - 1] || items[index - 1].user_id !== friend.pk)"
          :src="friend.profile_pic_url"
        >
        <div v-else class="image-placeholder"/>
        <div v-if="item.item_type === 'text'" class="message">{{ item.text }}</div>
      </div>
      <div
        class="message-preface"
        v-if="item.reel_share"
      >{{ item.reel_share.type === 'reaction' ? 'You reacted to their story' : 'You replied to their story' }}</div>
      <div v-if="item.item_type === 'reel_share'" class="message">{{ item.reel_share.text }}</div>
    </div>
    <form @submit.prevent="onSubmit">
      <input v-model="message" name="message">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  props: {
    items: {},
    thread: {},
  },
  methods: {
    async onSubmit() {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.thread.thread_id, message: this.message }),
      }
      const { status, statusText } = await fetch('/send-message', config)
      this.message = ''
    },
  },
  computed: {
    friend() {
      return this.thread && this.thread.users[0]
    },
  },
}
</script>

<style scoped>
.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-right: 5px;
}

.chat-item {
  margin: 5px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.message-wrapper {
  display: flex;
}

.image-placeholder {
  min-width: 50px;
}

img {
  min-width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
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
