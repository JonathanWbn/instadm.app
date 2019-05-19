<template>
  <form @submit.prevent="onSubmit">
    <input v-model="message" name="message">
    <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
        ></path>
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.message)
      this.message = ''
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  margin: 5px;
  padding: 10px 15px;
  border-radius: 5px;
}

input {
  flex-grow: 1;
  border: none;
  font-size: 14px;
}

input:focus {
  outline: none;
}

button {
  width: 40px;
  height: 40px;
  background-color: lightblue;
  border: none;
  border-radius: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  cursor: pointer;
}

button > svg {
  fill: white;
}
</style>
