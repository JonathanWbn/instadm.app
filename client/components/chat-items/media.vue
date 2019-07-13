<template>
  <div>
    <div
      v-if="item.media.media_type === 1"
      class="wrapper"
      :style="{ height: `${(media.height / media.width) * 200}px` }"
    >
      <a :href="media.url" target="_blank">
        <img :src="media.url" />
      </a>
    </div>
    <div
      v-else-if="item.media.media_type === 2"
      class="wrapper"
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
      switch (this.item.media.media_type) {
        case 1:
          return this.item.media.image_versions2.candidates[0]
        case 2:
          return this.item.media.video_versions[0]
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
.wrapper {
  width: 200px;
}

.wrapper {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
