<template>
  <div class="options">
    <h6 class="options-title">{{data.title}}</h6>
    <div class="options__box">
      <p v-if="value" class="options-value">{{Math.round(value)}} <span>{{ data.name }}</span></p>
      <div class="options-info">
        <img class="options-icon" :class="{'is-small' : data.id === 1}" :src="data.icon" alt="icon" />
        <p class="options-text">{{ data.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  data: Object,
  value: {
    type: [String, Number]
  }
})

</script>

<style lang="scss" scoped>
.options {
  @include CardValue;
  &__box {
    display: flex;
    align-items:  center;
    justify-content: space-between;
  }
}
.options-title {
  font-size: 14px;
}
.options-value {
  font-size: 20px;
  line-height: 1.2;
  display: flex;
  gap: 3px;
  align-items: flex-end;
  font-weight: 500;
  span {
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: #c7c7c7;
  }
}
.options-info {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.options-icon {
  width: 30px;
  &.is-small{
    width: 25px;
    margin-bottom: 3px;
  }
}
.options-text {
  font-size: 13px;
  line-height: 1.2;
  color: #dbdbdb;
}
</style>
