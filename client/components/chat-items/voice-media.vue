<template>
  <div class="audio">
    <audio controls>
      <source :src="item.voice_media.media.audio.audio_src" type="audio/mp4" />
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
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  border-radius: 5px;
}
</style>
