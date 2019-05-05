<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <div class="container">
      <div class="inbox-list">
        <div v-for="item in inbox" :key="item.thread_id" class="inbox-item">
          <strong>{{ item.thread_title }}</strong>
          <span
            v-if="item.last_permanent_item.item_type === 'reel_share'"
          >{{item.last_permanent_item.reel_share.text }}</span>
          <span
            v-if="item.last_permanent_item.item_type === 'text'"
          >{{item.last_permanent_item.text }}</span>
          <span v-if="item.last_permanent_item.item_type === 'raven_media'">expired image</span>
        </div>
      </div>
      <div class="chat-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inbox: [],
    }
  },
  created() {
    fetch('/inbox')
      .then(res => res.json())
      .then(res => this.setInbox(res))
      .catch(() => (window.location.href = '/login'))
  },
  methods: {
    setInbox(inbox) {
      this.inbox = inbox
    },
  },
}
</script>

<style>
.wrapper {
  height: 100vh;
  width: 100vw;
  background-color: #f3f3fc;
  padding: 75px;
}

.container {
  display: flex;
  flex-direction: row;
  height: calc(100% - 38px);
}

.inbox-list {
  overflow: scroll;
}

.inbox-item {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 30px 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
}

.chat-container {
  flex-grow: 1;
  border: 1px solid lightgrey;
}
</style>
