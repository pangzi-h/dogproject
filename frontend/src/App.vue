<template>
  <view>
    <slot />
  </view>
</template>

<script>
export default {
  onLaunch() {
    console.log('pet-boarding frontend started')
  }
}
</script>

<style lang="scss">
@import './styles/variables.scss';
</style>
