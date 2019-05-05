<template>
  <section class="container">
    <h1 class="title">Instagram DM web app</h1>
  </section>
</template>

<script>
fetch('/feed')
  .then(res => res.json())
  .then(res => console.log('res', res))
  .catch(() => console.log('feed fetch failed'))
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
