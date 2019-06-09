<template>
  <div class="wrapper" :style="{ height: `${media.height / media.width * 200}px` }">
    <a :href="media.url" target="_blank">
      <img :src="media.url">
    </a>
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
      return this.item.animated_media.images.fixed_height
    },
  },
}
</script>

<style scoped>
.wrapper {
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
}

img,
.wrapper {
  width: 200px;
}
</style>
