<template>
  <div class="wrapper">
    <div class="header">
      <h1>Chat</h1>
      <button class="logout-button" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"></path>
        </svg>
      </button>
    </div>
    <div class="container">
      <InboxList @select-thread="selectThread"/>
      <ChatContainer :thread-id="selectedThreadId" :user="user"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import InboxList from '~/components/inbox-list'
import ChatContainer from '~/components/chat-container'

export default {
  components: {
    InboxList,
    ChatContainer,
  },
  data() {
    return {
      selectedThreadId: null,
      user: null,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    selectThread(thread_id) {
      this.selectedThreadId = thread_id
    },
    getUser() {
      axios
        .get('/api/user')
        .then(({ data }) => (this.user = data))
        .catch(() => (window.location.href = '/login'))
    },
    logout() {
      axios.post('/api/logout').then(() => (window.location.href = '/login'))
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

.header {
  display: flex;
  justify-content: space-between;
}

h1 {
  margin-left: 10px;
}

.container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 38px);
}

.logout-button {
  background-color: unset;
  border: none;
  padding: 0;
  cursor: pointer;
}

.logout-button > svg {
  fill: #9e9e9e;
  transition: 0.3s;
}

.logout-button:hover > svg {
  fill: black;
}
</style>
