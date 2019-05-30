<template>
  <div>
    <form @submit.prevent="onSubmit">
      <button
        v-if="!filePreviewUrl"
        type="button"
        class="emoji-toggle"
        @click.prevent="toggleEmojiPicker"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"
          ></path>
        </svg>
      </button>
      <div v-if="showEmojiPicker">Emoji Picker</div>
      <img v-if="filePreviewUrl" class="file-preview" :src="filePreviewUrl">
      <input v-else v-model="message" name="message" class="text-input">
      <div v-if="filePreviewUrl" class="file-preview-close" @click="clearFile">x</div>
      <input
        id="file"
        type="file"
        name="file"
        accept="image/*"
        class="file-input"
        @change="onFileUpload"
      >
      <label for="file" class="file-input-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 1v7.5c0 1.933-1.566 3.5-3.5 3.5s-3.5-1.567-3.5-3.5v-6c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v4.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-4h1v4c0 .275.225.5.5.5s.5-.225.5-.5v-4.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v6c0 1.378 1.121 2.5 2.5 2.5s2.5-1.122 2.5-2.5v-7.5h1zm2 0v2c3.282 0 3.772 2.946 3 6 0 0 6-1.65 6 2.457v10.543h-15v-8.025c-.715-.065-1.39-.269-2-.582v10.607h19v-13.386c0-1.843-5.583-9.614-11-9.614zm-1.499 14c.827 0 1.499-.672 1.499-1.5s-.672-1.5-1.499-1.5c-.829 0-1.501.672-1.501 1.5s.672 1.5 1.501 1.5zm7.499 4h-9l2.097-3 1.31.968 2.093-2.968 3.5 5z"
          ></path>
        </svg>
      </label>
      <button type="submit" class="submit-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import FormData from 'form-data'

export default {
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: '',
      file: null,
      showEmojiPicker: false,
    }
  },
  computed: {
    filePreviewUrl() {
      return this.file && window.URL.createObjectURL(this.file)
    },
  },
  methods: {
    onSubmit() {
      if (this.file) {
        this.sendPhoto()
      } else {
        this.sendMessage()
      }
    },
    onFileUpload(e) {
      this.file = e.target.files[0]
    },
    clearFile() {
      this.file = null
    },
    sendPhoto() {
      const fd = new FormData()
      fd.append('file', this.file)
      fetch(`/send-photo/${this.threadId}`, {
        method: 'POST',
        body: fd,
      })
        .then(res => res.json())
        .then(() => this.$emit('refetch'))
      this.file = null
    },
    sendMessage() {
      fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: this.threadId, message: this.message }),
      })
        .then(res => res.json())
        .then(() => this.$emit('refetch'))
      this.message = ''
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: white;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  margin: 5px;
  padding: 10px 15px;
  border-radius: 5px;
}

.file-preview {
  height: 120px;
  object-fit: contain;
}

.file-preview-close {
  align-self: flex-start;
  cursor: pointer;
  flex-grow: 1;
}

.text-input {
  flex-grow: 1;
  border: none;
  font-size: 14px;
  resize: none;
  height: 40px;
}

.file-input-label {
  cursor: pointer;
  padding: 6px;
}

.file-input {
  display: none;
}

.file-input-label > svg {
  fill: grey;
  transition: 0.3s ease;
}

.file-input-label:hover > svg {
  fill: black;
}

.submit-button {
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

.submit-button > svg {
  fill: white;
}

.emoji-toggle {
  background-color: unset;
  border: none;
  padding: 0;
  padding: 6px;
  cursor: pointer;
}

.emoji-toggle > svg {
  fill: grey;
}

.emoji-toggle:hover > svg {
  fill: black;
}
</style>
