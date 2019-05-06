<template>
  <section class="container">
    <form @submit.prevent="onSubmit(username, password)">
      <input v-model="username" type="text" name="username" class="input" placeholder="Username">
      <input
        v-model="password"
        type="password"
        name="password"
        class="input"
        placeholder="Password"
      >
      <button type="submit">LOGIN</button>
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
      if (!email || !password) return
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      })
        .then(() => (window.location.href = '/'))
        .catch(() => (window.location.href = '/error'))
    },
  },
}
</script>

<style>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  background-color: white;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

input {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-bottom: 20px;
  font-size: 15px;
  padding: 7px 10px;
  width: 300px;
}

button {
  background-color: #6772e5;
  border: none;
  padding: 10px;
  color: white;
  font-size: 13px;
  border-radius: 2px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

button:hover {
  background-color: #7795f8;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
</style>
