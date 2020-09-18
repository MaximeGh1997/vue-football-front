<template>
    <div class="loader" :class="{ 'loader--visible': visible }">
    </div>
</template>

<script>

export default {
  name: 'loader',
  props: ['visible'],
  components: {
  }
}
</script>

<style>
.loader {
    width: 1000px;
    height: 550px;
}
</style>
