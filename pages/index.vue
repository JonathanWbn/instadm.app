<template>
  <section class="container">
    <h1 class="title">Instagram DM web app</h1>
    <ul>
      <li v-for="item in inbox">
        <strong>{{ item.thread_title }}</strong>
        <span
          v-if="item.last_permanent_item.item_type === 'reel_share'"
        >{{item.last_permanent_item.reel_share.text }}</span>
        <span
          v-if="item.last_permanent_item.item_type === 'text'"
        >{{item.last_permanent_item.text }}</span>
        <span v-if="item.last_permanent_item.item_type === 'raven_media'">expired image</span>
      </li>
    </ul>
  </section>
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
