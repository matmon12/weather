<template>
  <div class="coord">
    <div class="coord__inner">
      <div class="coord__img-wrapper">
        <img class="coord__img" src="../img/compass.png" alt="icon" />
      </div>
      <div class="coord__block">
        <div class="coord__info">
          <h3 class="coord__info-title">Longitude: {{ coord?.lon }}</h3>
          <p class="coord__info-text">
            Longitude measures distance east ог west of the prime meridian.
          </p>
        </div>
        <div class="coord__info">
          <h3 class="coord__info-title">Latitude: {{ coord?.lat }}</h3>
          <p class="coord__info-text">
            Leatitude lines start the equator (0 degrees latitude) and run east апа west,
            parallel to the equator.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  coord: {
    type: Object,
  }
})
</script>

<style lang="scss" scoped>
.coord {
  @include CardLayout;

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
