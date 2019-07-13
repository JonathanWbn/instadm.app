<template>
  <button :type="type" :class="{ loading: isLoading, [design]: true }" :disabled="isLoading" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    type: {
      type: String,
      default: 'default',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    design: {
      type: String,
      default: 'primary',
      validator: val => ['primary', 'text'].includes(val),
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style scoped>
button {
  -webkit-appearance: none;
  text-transform: uppercase;
  text-align: center;
  line-height: 38px;
  height: 40px;
  font-weight: 500;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  padding: 0px 25px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.2s ease 0s;
  overflow: hidden;
  outline: none;
}

button.primary {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
}

button.primary:hover {
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
}

button.text {
  line-height: 22px;
  height: 35px;
  color: rgb(102, 102, 102);
  background-color: transparent;
  padding: 0px 10px;
  border-color: transparent;
}

button.text:hover {
  color: black;
}

button.loading {
  color: rgb(204, 204, 204);
  cursor: default;
  pointer-events: none;
  background: rgb(250, 250, 250);
  border-color: rgb(234, 234, 234);
}
</style>
