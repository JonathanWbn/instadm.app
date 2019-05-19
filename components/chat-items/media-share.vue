<template>
  <div class="media-share">
    <a
      v-if="item.media_share.media_type === 1"
      :href="item.media_share.image_versions2.candidates[0].url"
      target="_blank"
    >
      <img :src="item.media_share.image_versions2.candidates[0].url">
    </a>
    <video v-else-if="item.media_share.media_type === 2" controls>
      <source :src="item.media_share.video_versions[0].url" type="video/mp4">
    </video>
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
}
</script>

<style scoped>
img {
  height: 200px;
  border: 1px solid black;
  border-radius: 5px;
}

video {
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
}

video:focus {
  outline: none;
}
</style>
