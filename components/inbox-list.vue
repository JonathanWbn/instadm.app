<template>
  <div class="inbox-list">
    <div
      v-for="(item, index) in inbox"
      :key="item.thread_id"
      class="inbox-item"
      @click="selectThread(index)"
    >
      <img :src="item.users[0].profile_pic_url">
      <div class="text">
        <p class="title">{{ item.thread_title }}</p>
        <p class="content">{{ item.content }}</p>
      </div>
      <div class="last-activity">{{ item.last_activity_date }}</div>
    </div>
    <button v-if="moreInboxAvailable" @click="getMoreInbox">Get more</button>
  </div>
</template>

<script>
import { formatThread } from '../utils'

export default {
  data() {
    return {
      inbox: [],
      moreInboxAvailable: false,
    }
  },
  created() {
    this.getInbox()
  },
  methods: {
    selectThread(index) {
      this.$emit('select-thread', this.inbox[index].thread_id)
    },
    getInbox() {
      fetch('/inbox')
        .then(res => res.json())
        .then(res => {
          this.moreInboxAvailable = res.moreAvailable
          this.inbox = res.inbox.map(formatThread)
        })
        .catch(() => (window.location.href = '/login'))
    },
    getMoreInbox() {
      fetch('/more-inbox')
        .then(res => res.json())
        .then(res => {
          this.moreInboxAvailable = res.moreAvailable
          this.inbox = [...this.inbox, ...res.inbox.map(formatThread)]
        })
        .catch(() => (window.location.href = '/login'))
    },
  },
}
</script>

<style scoped>
.inbox-list {
  overflow: scroll;
  min-width: 420px;
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
</style>
