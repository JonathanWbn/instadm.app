<template>
  <form @submit.prevent="onSubmit">
    <textarea v-model="message" name="message" class="text-input"/>
    <input id="file" type="file" name="file" class="file-input" @change="onImageUpload">
    <label for="file" class="file-input-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M9 1v7.5c0 1.933-1.566 3.5-3.5 3.5s-3.5-1.567-3.5-3.5v-6c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v4.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-4h1v4c0 .275.225.5.5.5s.5-.225.5-.5v-4.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v6c0 1.378 1.121 2.5 2.5 2.5s2.5-1.122 2.5-2.5v-7.5h1zm2 0v2c3.282 0 3.772 2.946 3 6 0 0 6-1.65 6 2.457v10.543h-15v-8.025c-.715-.065-1.39-.269-2-.582v10.607h19v-13.386c0-1.843-5.583-9.614-11-9.614zm-1.499 14c.827 0 1.499-.672 1.499-1.5s-.672-1.5-1.499-1.5c-.829 0-1.501.672-1.501 1.5s.672 1.5 1.501 1.5zm7.499 4h-9l2.097-3 1.31.968 2.093-2.968 3.5 5z"
        ></path>
      </svg>
    </label>
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
      fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.threadId, message: this.message }),
      })
        .then(res => res.json())
        .then(() => this.$emit('refetch'))
      this.message = ''
    },
    onImageUpload() {
      // e.target.files[0]
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

.text-input {
  flex-grow: 1;
  border: none;
  font-size: 14px;
  resize: none;
}

.text-input:focus {
  outline: none;
}

.file-input {
  display: none;
}

.file-input-label {
  cursor: pointer;
  margin-right: 10px;
}

.file-input-label > svg {
  fill: grey;
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
