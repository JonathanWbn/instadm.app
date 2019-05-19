<template>
  <div class="chat-container">
    <div id="messages" class="messages">
      <div
        v-for="item in items"
        :key="item.item_id"
        class="chat-item"
        :class="[ item.isFromUser ? 'user-item' : 'friend-item' ]"
      >
        <img
          v-if="!item.isFromUser"
          :src="thread.users[0].profile_pic_url"
          class="profile-thumbnail"
        >
        <Message v-if="item.item_type === 'text'" :item="item"/>
        <ReelShare
          v-else-if="item.item_type === 'reel_share'"
          :item="item"
          :friend="thread.users[0]"
        />
        <div
          v-else-if="item.item_type === 'media_share' && item.media_share.media_type === 1"
          class="media-share"
        >
          <a :href="item.media_share.image_versions2.candidates[0].url" target="_blank">
            <img :src="item.media_share.image_versions2.candidates[0].url">
          </a>
        </div>
        <div
          v-else-if="item.item_type === 'media_share' && item.media_share.media_type === 2"
          class="media-share"
        >
          <video controls>
            <source :src="item.media_share.video_versions[0].url" type="video/mp4">
          </video>
        </div>
        <div v-else-if="item.item_type === 'audio'" class="audio">
          <audio controls>
            <source :src="item.audio_versions[0].url">
          </audio>
        </div>
        <div v-else-if="item.item_type === 'like'" class="message">❤️</div>
      </div>
    </div>
    <form v-if="items.length > 0" class="message-form" @submit.prevent="onSubmit">
      <input v-model="message" name="message" class="message-input">
      <button type="submit" class="send-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import Message from './chat-items/message'
import ReelShare from './chat-items/reel-share'

export default {
  components: {
    Message,
    ReelShare,
  },
  props: {
    threadId: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      message: '',
      thread: null,
    }
  },
  computed: {
    items() {
      return this.thread
        ? this.thread.items
            .filter(el => el.item_type !== 'action_log' && el.item_type !== 'placeholder')
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(el => ({ ...el, isFromUser: el.user_id === this.user.pk }))
        : []
    },
  },
  watch: {
    threadId(newId) {
      if (newId) {
        this.getThread(newId)
      }
    },
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    async onSubmit() {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.threadId, message: this.message }),
      }
      this.message = ''
      const { status } = await fetch('/send-message', config)
      if (status === 200) {
        await this.getThread()
      }
    },
    async getThread(id = this.threadId) {
      const res = await fetch(`/thread/${id}`)
      if (res.status === 200) {
        this.thread = await res.json()
      }
    },
    scrollToBottom() {
      const container = this.$el.querySelector('#messages')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
  },
}
</script>

<style>
.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.messages {
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-right: 5px;
}

.chat-item {
  margin: 7px 5px;
  max-width: 400px;
  display: flex;
  min-height: min-content;
  align-items: flex-start;
}

.image-placeholder {
  min-width: 50px;
}

.profile-thumbnail {
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

.message-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  margin: 5px;
  padding: 10px 15px;
  border-radius: 5px;
}

.message-input {
  flex-grow: 1;
  border: none;
  font-size: 14px;
}

.message-input:focus {
  outline: none;
}

.send-button {
  width: 40px;
  height: 40px;
  background-color: lightblue;
  border: none;
  border-radius: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  cursor: pointer;
}

.send-button > svg {
  fill: white;
}

.media-share img {
  height: 200px;
  border: 1px solid black;
  border-radius: 5px;
}

.media-share video {
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
}

.media-share video:focus {
  outline: none;
}
</style>
