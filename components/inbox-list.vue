<template>
  <div class="inbox-list">
    <div
      v-for="(item, index) in inbox"
      :key="item.thread_id"
      class="inbox-item"
      @click="selectThread(index)"
    >
      <div class="image-wrapper">
        <img :src="item.users[0].profile_pic_url">
        <div v-if="item.users.length > 1" class="more-users">+{{ item.users.length - 1 }}</div>
      </div>
      <div class="text">
        <p class="title">{{ item.thread_title }}</p>
        <p class="content">{{ item.content }}</p>
      </div>
      <div class="last-activity">{{ item.last_activity_date }}</div>
    </div>
    <infinite-loading v-if="inbox.length > 0" @infinite="getMoreInbox"/>
  </div>
</template>

<script>
import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'
import { formatThread } from '../utils'

export default {
  components: {
    InfiniteLoading,
  },
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
      axios
        .get('/inbox')
        .then(({ data }) => {
          this.moreInboxAvailable = data.moreAvailable
          this.inbox = data.inbox.map(formatThread)
        })
        .catch(() => (window.location.href = '/login'))
    },
    getMoreInbox($state) {
      axios
        .get('/more-inbox')
        .then(({ data }) => {
          this.moreInboxAvailable = data.moreAvailable
          this.inbox = [...this.inbox, ...data.inbox.map(formatThread)]

          if (res.moreAvailable) $state.loaded()
          else $state.complete()
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
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.inbox-item {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
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

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  border-radius: 100%;
  height: 50px;
  min-width: 50px;
}

.more-users {
  background-color: #c7c7c7;
  border-radius: 100%;
  width: 22px;
  height: 22px;
  position: absolute;
  bottom: 2px;
  right: 2px;
  text-align: center;
  font-size: 9px;
  line-height: 22px;
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
  margin-right: 55px;
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
