<template>
  <section class="container">
    <h1>Instagram Direct Messaging</h1>
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
      if (!this.username && !this.password) {
        this.error = 'Please provide your username and password.'
        return
      } else if (!this.username) {
        this.error = 'Please provide your username.'
        return
      } else if (!this.password) {
        this.error = 'Please provide your password.'
        return
      }
      this.isLoading = true
      this.error = null
      axios
        .post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          this.isLoading = false
          window.location.href = '/'
        })
        .catch(err => {
          this.isLoading = false
          this.error = err.response.data || err.message
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-bottom: 60px;
  font-weight: 400;
  font-size: 32px;
}

form {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

input {
  background-color: white;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 27px;
  padding: 4px 10px;
  width: 300px;
  transition: border 0.3s ease;
}

input:focus {
  border: 1px solid rgb(136, 136, 136);
}

input::placeholder {
  color: #ccc;
}

button {
  -webkit-appearance: none;
  text-transform: uppercase;
  text-align: center;
  line-height: 38px;
  height: 40px;
  font-weight: 500;
  font-size: 12px;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  padding: 0px 25px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(0, 0, 0);
  transition: all 0.2s ease 0s;
  overflow: hidden;
  outline: none;
}

button:hover {
  color: rgb(0, 0, 0);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(0, 0, 0);
  border-image: initial;
  background: rgb(255, 255, 255);
}

button.loading {
  color: rgb(204, 204, 204);
  cursor: default;
  pointer-events: none;
  background: rgb(250, 250, 250);
  border-color: rgb(234, 234, 234);
}

.error {
  color: red;
  text-align: center;
  width: 300px;
  margin-bottom: 20px;
}
</style>
