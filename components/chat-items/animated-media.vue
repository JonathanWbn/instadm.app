<template>
  <div>
    <a :href="item.animated_media.images.fixed_height.url" target="_blank">
      <img :src="item.animated_media.images.fixed_height.url">
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
}
</script>

<style scoped>
img {
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
