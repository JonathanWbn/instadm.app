<template>
  <section class="container">
    <form v-on:submit.prevent="onSubmit(username, password);">
      <h1 class="title">Instagram DM web app</h1>
      <input type="text" name="username" class="input" v-model="username">
      <input type="password" name="password" class="input" v-model="password">
      <button type="submit">submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      window.fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password })
      });
    }
  }
};
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
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
