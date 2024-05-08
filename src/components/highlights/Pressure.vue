<template>
  <div class="pressure">
    <h6 class="pressure-title">Pressure</h6>
    <div class="pressure-img-wrapper">
      <img class="pressure-img" src="@/img/barometer.png" alt="pressure" />
    </div>
    <div class="pressure__box">
      <div class="pressure-info">{{ getPressureMm(pressure) }}<span>mm</span></div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import {getPressureMm} from '@/utils/index'


const props = defineProps({
  pressure: {
    type: Number
  }
})
</script>

<style lang="scss" scoped>
.pressure {
  @include CardValue;
  &__box {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 15px 20px;
  }
}
.pressure-title {
  font-size: 14px;
  margin-bottom: 10px;
}
.pressure-img {
  &-wrapper{
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.pressure-info {
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
