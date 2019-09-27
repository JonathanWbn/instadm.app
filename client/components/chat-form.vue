<template>
  <div>
    <form autocomplete="off" @submit.prevent="onSubmit">
      <button v-if="!filePreviewUrl" type="button" class="emoji-toggle" @click.prevent="toggleEmojiPicker">
        <svg v-if="showEmojiPicker" width="20px" height="20px" viewBox="0 0 7 7" aria-label="delete">
          <g stroke="#000" stroke-width="0.8" fill="none" fill-rule="evenodd">
            <path d="M6.093.593L.906 5.719m0-5.126l5.188 5.126"></path>
          </g>
        </svg>
        <svg v-else width="20px" height="20px" viewBox="0 0 14 14" aria-label="emoji">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              d="M3.3 8.1c0-.4.4-.3.7-.4h1l.3-.1h4.3l.7.2c.2 0 .4 0 .5.3v.4c0 1.2-1 2.3-2.4 2.7h-.6l-.2.1a2 2 0 0 1-1 0h-.3c-1.6-.3-2.7-1.3-3-2.6V8m6.4-3.7c.4.1.7.3.8.8v.5c-.1.5-.6.8-1 .8-.6 0-1-.5-1.1-1 0-.5.3-1 .8-1.1h.5m-4.2.9c.1.4-.2 1-.6 1.1-.6.2-1.1 0-1.4-.5V5c0-.5.3-.7.7-.8h.5c.4 0 .7.3.8.8v.1"
              fill="#000"
              fill-rule="nonzero"
              stroke-width="0"
            ></path>
            <circle stroke="#000" cx="7" cy="7" r="6.5"></circle>
          </g>
        </svg>
      </button>
      <picker
        v-if="showEmojiPicker"
        :data="emojiIndex"
        :auto-focus="true"
        color="orange"
        :show-preview="false"
        :show-categories="false"
        :show-skin-tones="false"
        :emoji-tooltip="true"
        @select="addEmoji"
      />
      <img v-if="filePreviewUrl" class="file-preview" :src="filePreviewUrl" />
      <textarea
        v-else
        ref="text-input"
        v-model="message"
        autocomplete="off"
        name="message"
        class="text-input"
        placeholder="Type here..."
      />
      <div v-if="filePreviewUrl" class="file-preview-close" @click="clearFile">
        <svg width="20px" height="20px" viewBox="0 0 7 7" aria-label="delete">
          <g stroke="#000" stroke-width="0.8" fill="none" fill-rule="evenodd">
            <path d="M6.093.593L.906 5.719m0-5.126l5.188 5.126"></path>
          </g>
        </svg>
      </div>
      <input id="file" type="file" name="file" accept="image/jpg" class="file-input" @change="onFileUpload" />
      <label for="file" class="file-input-label">
        <svg width="20px" height="20px" viewBox="0 0 15 19" fill="none" aria-label="file">
          <path
            d="M10 8C8.34 8 7 6.66 7 5V1H3C1.9 1 1 1.9 1 3V16C1 17.1 1.9 18 3 18H12C13.1 18 14 17.1 14 16V8H10ZM8 5C8 6.1 8.9 7 10 7H13.59L8 1.41V5ZM3 0H8L15 7V16C15 17.66 13.66 19 12 19H3C1.34 19 0 17.66 0 16V3C0 1.34 1.34 0 3 0Z"
            fill="#000"
          ></path>
        </svg>
      </label>
      <Button type="submit" label="Send" design="text" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

import icons from '../apple-icons.json'
import Button from './button'

export default {
  components: {
    Picker,
    Button,
  },
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
      emojiIndex: new EmojiIndex(icons),
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
      } else if (this.message) {
        this.sendMessage()
      }
      this.showEmojiPicker = false
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
      axios.post(`/api/send-photo/${this.threadId}`, fd).then(() => this.$emit('refetch'))
      this.file = null
    },
    sendMessage() {
      axios
        .post('/api/send-message', {
          thread_id: this.threadId,
          message: this.message,
        })
        .then(() => this.$emit('refetch'))
      this.message = ''
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker
    },
    addEmoji(emoji) {
      this.message = this.message + emoji.native
      this.showEmojiPicker = false
      this.$refs['text-input'].focus()
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
  position: relative;
}

.file-preview {
  height: 120px;
  object-fit: contain;
}

.file-preview-close {
  align-self: flex-start;
  cursor: pointer;
  flex-grow: 1;
  margin-left: 5px;
}

.text-input {
  flex-grow: 1;
  border: none;
  font-size: 15px;
  resize: none;
  height: 29px;
}

.text-input:focus {
  height: 80px;
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

.emoji-mart {
  position: absolute;
  left: 0px;
  bottom: 70px;
  border: none;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  border-radius: 5px;
}
</style>
