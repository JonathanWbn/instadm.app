<template>
  <div class="audio">
    <audio controls>
      <source :src="item.voice_media.media.audio.audio_src" type="audio/mp4">
    </audio>
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
audio {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
