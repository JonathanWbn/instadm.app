<template>
  <div>
    <a
      v-if="item.media.media_type === 1"
      :href="item.media.image_versions2.candidates[0].url"
      target="_blank"
    >
      <img :src="item.media.image_versions2.candidates[0].url">
    </a>
    <video v-else-if="item.media.media_type === 2" controls>
      <source :src="item.media.video_versions[0].url" type="video/mp4">
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
  width: 200px;
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
