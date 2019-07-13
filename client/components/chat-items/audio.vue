<template>
  <div class="audio">
    <audio controls>
      <source :src="item.audio_versions[0].url" />
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
