<template>
  <div class="chat-container">
    <div id="messages" class="chat-thread">
      <LoadMoreButton v-if="moreAvailable" @click="loadMoreItems"/>
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
        <VoiceMedia v-else-if="item.item_type === 'voice_media'" :item="item"/>
        <Media v-else-if="item.item_type === 'media'" :item="item"/>
        <AnimatedMedia v-else-if="item.item_type === 'animated_media'" :item="item"/>
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
import VoiceMedia from './chat-items/voice-media'
import Media from './chat-items/media'
import AnimatedMedia from './chat-items/animated-media'
import ChatForm from './chat-form'
import LoadMoreButton from './load-more-button'

export default {
  components: {
    Message,
    ReelShare,
    MediaShare,
    ChatForm,
    VoiceMedia,
    Media,
    Like,
    AnimatedMedia,
    LoadMoreButton,
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
      moreAvailable: false,
    }
  },
  computed: {
    items() {
      return this.thread
        ? this.thread.items
            .filter(
              el =>
                !['action_log', 'placeholder', 'raven_media', 'video_call_event', 'story_share'].includes(el.item_type)
            )
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
  methods: {
    onSubmit(message) {
      fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.threadId, message }),
      })
        .then(res => res.json())
        .then(() => this.getThread())
    },
    getThread(id = this.threadId) {
      fetch(`/thread/${id}`)
        .then(res => res.json())
        .then(({ thread, moreAvailable }) => {
          this.thread = thread
          this.moreAvailable = moreAvailable
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        })
    },
    scrollToBottom() {
      const container = this.$el.querySelector('#messages')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    loadMoreItems() {
      fetch(`/more-items/${this.threadId}`)
        .then(res => res.json())
        .then(({ items, moreAvailable }) => {
          this.thread = {
            ...this.thread,
            items: [...this.thread.items, ...items],
          }
          this.moreAvailable = moreAvailable
        })
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
