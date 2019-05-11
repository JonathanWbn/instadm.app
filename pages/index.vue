<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <div class="container">
      <InboxList @select-thread="selectThread" :inbox="inbox"/>
      <ChatContainer :items="items" :thread="thread"/>
    </div>
  </div>
</template>

<script>
import { formatThread } from '../utils'
import InboxList from '~/components/inbox-list'
import ChatContainer from '~/components/chat-container'

export default {
  data() {
    return {
      inbox: [],
      selectedThread: undefined,
    }
  },
  created() {
    fetch('/inbox')
      .then(res => res.json())
      .then(res => (this.inbox = res.map(formatThread)))
      .catch(() => (window.location.href = '/login'))
  },
  components: {
    InboxList,
    ChatContainer,
  },
  methods: {
    selectThread(index) {
      this.selectedThread = index
    },
  },
  computed: {
    items() {
      return this.thread ? this.thread.items.sort((a, b) => a.timestamp - b.timestamp) : []
    },
    friends() {
      return this.thread ? this.thread.users : []
    },
    thread() {
      return typeof this.selectedThread === 'number' ? this.inbox[this.selectedThread] : null
    },
  },
}
</script>

<style>
.wrapper {
  height: 100vh;
  width: 100vw;
  padding: 75px;
}

h1 {
  margin-left: 10px;
}

.container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 38px);
}
</style>
