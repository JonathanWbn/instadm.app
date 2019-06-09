<template>
  <section class="container">
    <form @submit.prevent="onSubmit">
      <input v-model="username" type="text" name="username" class="input" placeholder="Username">
      <input
        v-model="password"
        type="password"
        name="password"
        class="input"
        placeholder="Password"
      >
      <div v-if="error" class="error">{{ error }}</div>
      <button
        type="submit"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
      >{{ isLoading ? '...' : 'LOGIN' }}</button>
    </form>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  head() {
    return {
      title: 'Login - Instagram DM',
    }
  },
  data() {
    return {
      username: null,
      password: null,
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async onSubmit() {
      if (!this.username || !this.password) return
      this.isLoading = true
      axios
        .post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          this.isLoading = false
          window.location.href = '/'
        })
        .catch(err => {
          this.isLoading = false
          this.error = err.message
        })
    },
  },
}
</script>

<style scoped>
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

button.loading {
  background-color: grey;
  cursor: default;
}

.error {
  color: #d64040;
  text-align: center;
  width: 300px;
}
</style>
