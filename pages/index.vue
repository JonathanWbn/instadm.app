<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <div class="container">
      <div class="inbox-list">
        <div v-for="item in inbox" :key="item.thread_id" class="inbox-item">
          <img :src="item.users[0].profile_pic_url">
          <div class="text">
            <p class="title">{{ item.thread_title }}</p>
            <p
              class="content"
              v-if="item.last_permanent_item.item_type === 'reel_share'"
            >{{item.last_permanent_item.reel_share.text }}</p>
            <p
              class="content"
              v-if="item.last_permanent_item.item_type === 'text'"
            >{{item.last_permanent_item.text }}</p>
            <p
              class="content"
              v-if="item.last_permanent_item.item_type === 'raven_media'"
            >expired image</p>
          </div>
          <div class="last-activity">{{item.last_activity_at}}</div>
        </div>
      </div>
      <div class="chat-container"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      inbox: [],
    }
  },
  created() {
    fetch('/inbox')
      .then(res => res.json())
      .then(
        res =>
          console.log(res) ||
          this.setInbox(res.map(el => ({ ...el, last_activity_at: moment(+el.last_activity_at).format('D MMM') })))
      )
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

h1 {
  margin-left: 10px;
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
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.inbox-item:hover {
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.inbox-item img {
  border-radius: 100%;
  height: 50px;
  width: 50px;
}

.inbox-item .last-activity {
  position: absolute;
  top: 20px;
  right: 20px;
  color: grey;
}

.inbox-item .text {
  margin-left: 15px;
}

.inbox-item .text .title {
  font-weight: 500;
}

.inbox-item .text .content {
  white-space: nowrap;
  text-overflow: ellipsis;
  color: grey;
  line-height: 26px;
  margin-top: 2px;
  overflow: hidden;
  width: 295px;
}

.chat-container {
  flex-grow: 1;
}
</style>
