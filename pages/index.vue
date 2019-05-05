<template>
  <section class="container">
    <form @submit.prevent="onSubmit(username, password)">
      <h1 class="title">Instagram DM web app</h1>
      <input v-model="username" type="text" name="username" class="input">
      <input v-model="password" type="password" name="password" class="input">
      <button type="submit">submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    onSubmit(email, password) {
      console.log('ON SUBMIT', email, password)
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
