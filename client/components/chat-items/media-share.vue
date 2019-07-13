<template>
  <div class="wrapper">
    <div class="header">{{ item.media_share.user.full_name }}</div>
    <div
      v-if="item.media_share.media_type === 1"
      class="container"
      :style="{ height: `${(media.height / media.width) * 200}px` }"
    >
      <a :href="media.url" target="_blank">
        <img :src="media.url" />
      </a>
    </div>
    <div
      v-else-if="item.media_share.media_type === 2"
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
  },
  computed: {
    media() {
      switch (this.item.media_share.media_type) {
        case 1:
          return this.item.media_share.image_versions2.candidates[0]
        case 2:
          return this.item.media_share.video_versions[0]
        default:
          return {}
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  overflow: hidden;
}

.header {
  background-color: white;
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid black;
}

img,
video,
.container {
  width: 200px;
}
</style>
