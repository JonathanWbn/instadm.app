<template>
  <button class="load-more-button" @click="onClick">Load more</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
.load-more-button {
  border: none;
  align-self: center;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 13px;
  background-color: #ff9800;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.load-more-button:hover {
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
</style>
