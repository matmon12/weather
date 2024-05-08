<template>
  <div class="humidity">
    <div class="humidity__inner">
      <div class="humidity__img-wrapper">
        <img class="humidity__img" src="../img/humidity.png" alt="icon" />
      </div>
      <div class="humidity__block">
        <div class="humidity__info">
          <h3 v-if="humidity" class="humidity__info-title">Humidity: {{ humidity }} %</h3>
          <p class="humidity__info-text">
            Humidity is the concentration of water vароr present in the air. Water vapor,
            те gaseous state 0f water, is gеnеrаllу invisible tо the human еуе.
            <br /><br />
            The same amount of water vapor results in higher retative humidity in cool air
            than warm air.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  humidity: {
    type: Number,
  }
})
</script>

<style lang="scss" scoped>
.humidity {
  @include CardLayout;
  background: radial-gradient(
    at left top,
    rgba(65, 88, 72, 1) 0%,
    rgba(55, 73, 59, 1) 18%,
    rgba(36, 54, 40, 1) 38%,
    rgba(22, 36, 27, 1) 62%,
    rgba(9, 13, 10, 1) 100%
  );

  &__inner {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__img-wrapper {
    width: 15%;
    min-width: 15%;
  }

  &__img {
  }

  &__block {
  }

  &__info {
    &+&{
      margin-top: 12px;
    }
  }

  &__info-title {
    font-weight: 600;
    margin-bottom: 3px;
  }

  &__info-text {
    font-size: 14px;
    color: #c7c7c7;
  }
}
</style>
