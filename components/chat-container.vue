<template>
  <div class="chat-container">
    <div id="messages" class="chat-thread">
      <div
        v-for="item in items"
        :key="item.item_id"
        :class="['chat-thread-item', item.isFromUser ? 'user' : 'friend']"
      >
        <img
          v-if="!item.isFromUser"
          :src="thread.users[0].profile_pic_url"
          class="chat-profile-thumbnail"
        >
        <Message v-if="item.item_type === 'text'" :item="item"/>
        <ReelShare
          v-else-if="item.item_type === 'reel_share'"
          :item="item"
          :friend="thread.users[0]"
        />
        <MediaShare v-else-if="item.item_type === 'media_share'" :item="item"/>
        <Audio v-else-if="item.item_type === 'audio'" :item="item"/>
        <Like v-else-if="item.item_type === 'like'"/>
      </div>
    </div>
    <ChatForm v-if="items.length > 0" @submit="onSubmit"/>
  </div>
</template>

<script>
import Message from './chat-items/message'
import ReelShare from './chat-items/reel-share'
import MediaShare from './chat-items/media-share'
import Like from './chat-items/like'
import ChatForm from './chat-form'

export default {
  components: {
    Message,
    ReelShare,
    MediaShare,
    ChatForm,
    Like,
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
    async onSubmit(message) {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.threadId, message }),
      }
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

.chat-thread {
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-right: 5px;
}

.chat-thread-item {
  margin: 7px 5px;
  max-width: 400px;
  display: flex;
  min-height: min-content;
  align-items: flex-start;
}

.chat-thread-item.friend {
  align-self: flex-start;
  align-items: flex-start;
}

.chat-thread-item.friend .chat-message {
  background-color: lightgray;
  color: black;
}

.chat-thread-item.user {
  align-self: flex-end;
  align-items: flex-end;
}

.chat-thread-item.user .chat-message {
  background-color: blue;
  color: white;
}

.chat-profile-thumbnail {
  min-width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
}

.chat-message {
  padding: 5px 15px;
  border-radius: 20px;
  line-height: 26px;
}
</style>
