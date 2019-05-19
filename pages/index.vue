<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <div class="container">
      <InboxList :inbox="inbox" @select-thread="selectThread"/>
      <ChatContainer :thread-id="selectedThreadId" :user="user"/>
    </div>
  </div>
</template>

<script>
import { formatThread } from '../utils'
import InboxList from '~/components/inbox-list'
import ChatContainer from '~/components/chat-container'

export default {
  components: {
    InboxList,
    ChatContainer,
  },
  data() {
    return {
      inbox: [],
      selectedThreadId: null,
      user: null,
    }
  },
  created() {
    this.getInbox()
    this.getUser()
  },
  methods: {
    selectThread(index) {
      this.selectedThreadId = this.inbox[index].thread_id
    },
    getInbox() {
      fetch('/inbox')
        .then(res => res.json())
        .then(res => (this.inbox = res.map(formatThread)))
        .catch(() => (window.location.href = '/login'))
    },
    getUser() {
      fetch('/user')
        .then(res => res.json())
        .then(res => (this.user = res))
        .catch(() => (window.location.href = '/login'))
    },
  },
}
</script>

<style scoped>
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
