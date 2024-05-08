<template>
  <div class="wind">
    <h6 class="wind-title">Wind</h6>
    <div class="wind-img-wrapper">
      <img class="wind-img" src="@/img/equalizer (2).png" alt="wind" />
    </div>
    <div class="wind__box">
      <div class="wind-info">{{ Math.round(wind?.speed) }}<span>m/s</span></div>
      <div class="wind-info">{{ wind?.deg }}<span>deg</span></div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  wind: {
    type: Object
  }
})


</script>

<style lang="scss" scoped>
.wind {
  @include CardValue;
  position: relative;
  &__box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 15px 20px;
  }
}
.wind-title {
  font-size: 14px;
}
.wind-img {
  &-wrapper{
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.wind-info {
  font-size: 20px;
  line-height: 1.2;
  display: flex;
  gap: 3px;
  align-items: flex-end;
  span {
    display: block;
    font-size: 16px;
    color: #afafaf;
  }
}
</style>
