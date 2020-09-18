<template>
    <div class="row justify-content-center loader" :class="{ 'loader--visible': visible }">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
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

<style lang="scss">
.loader {
    width: 100%;
    height: 700px;
    transition: 0.15s ease-in opacity;
    opacity: 0;
    position: absolute;
    pointer-events: none;
    background-color: white;
    z-index: 100;
    &--visible {
    opacity: 1;
    pointer-events: all;
  }
}

.loader .line {
    background-color: lightgrey;
    margin-bottom: 120px;
    height: 1px;
    width: 100%;
}
</style>
