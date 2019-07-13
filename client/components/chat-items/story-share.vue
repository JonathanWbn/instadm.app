<template>
  <div :class="['wrapper', item.isFromUser ? 'user' : 'friend']">
    <div class="message-preface">
      {{ item.story_share.title || `Sent @${item.story_share.media.user.username}'s story` }}
    </div>
    <div v-if="isExpired" class="expired">No longer available.</div>
    <div
      v-else-if="item.story_share.media.media_type === 1"
      class="container"
      :style="{ height: `${(media.height / media.width) * 200}px` }"
    >
      <a :href="media.url" target="_blank">
        <img :src="media.url" />
      </a>
    </div>
    <div
      v-else-if="item.story_share.media.media_type === 2"
      class="container"
      :style="{ height: `${(media.height / media.width) * 200}px` }"
    >
      <video controls>
        <source :src="media.url" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    friend: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isExpired() {
      return !this.item.story_share.media
    },
    media() {
      if (!this.item.story_share.media) return {}
      switch (this.item.story_share.media.media_type) {
        case 1:
          return this.item.story_share.media.image_versions2.candidates[0]
        case 2:
          return this.item.story_share.media.video_versions[0]
        default:
          return {}
      }
    },
  },
}
</script>

<style scoped>
img,
video,
.container {
  width: 200px;
}

.container {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  border-radius: 5px;
  overflow: hidden;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.wrapper.friend {
  align-items: flex-start;
}

.wrapper.user {
  align-items: flex-end;
}

.expired {
  color: #3f3f3f;
  font-weight: 500;
}
</style>
