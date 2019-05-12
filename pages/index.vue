<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <div class="container">
      <InboxList @select-thread="selectThread" :inbox="inbox"/>
      <ChatContainer :items="items" :thread="selectedThread"/>
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
      selectedThread: null,
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
      this.selectedThread = this.inbox[index]
    },
  },
  computed: {
    items() {
      return this.selectedThread ? this.selectedThread.items.sort((a, b) => a.timestamp - b.timestamp) : []
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
