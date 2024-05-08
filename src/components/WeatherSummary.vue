<template>
  <div :class="'summary'">
    <h2 v-if="!weatherStore.isError" class="summary-title">{{ weatherInfo?.name }}</h2>
    <InputGroup class="summary__input-group">
      <InputText
        class="summary__input"
        v-model="cityInput"
        unstyled
        @keyup.enter="!weatherStore.loading ? $emit('cityInput', cityInput) : undefined"
      />
      <InputGroupAddon
        v-if="!weatherStore.loading"
        class="summary__input-icon"
        unstyled
        @click="$emit('cityInput', cityInput)"
      >
        <i-f7:search />
      </InputGroupAddon>
      <i-svg-spinners:270-ring class="loading" v-else />
    </InputGroup>

    <div class="summary-group" v-if="!weatherStore.isError">
      <div class="summary__img-wrapper">
        <img
          class="summary__img"
          :src="getImageUrl(weatherInfo?.weather[0].description)"
          alt="weather"
        />
      </div>

      <div class="summary-group-left">
        <p class="summary__temp">{{ Math.round(weatherInfo?.main.temp) }} °С</p>
        <div class="summary__info">
          <div class="summary__info-icon-wrap">
            <img class="summary__info-icon" src="@/img/weather.svg" alt="icon" />
          </div>
          <p class="summary__info-text">
            {{ capitalizeFirstLetter(weatherInfo?.weather[0].description) }}
          </p>
        </div>

        <span class="line"></span>

        <div class="summary__info">
          <div class="summary__info-icon-wrap">
            <img class="summary__info-icon" src="@/img/location.svg" alt="icon" />
          </div>
          <p class="summary__info-text">
            {{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country }}
          </p>
        </div>
        <div class="summary__info">
          <div class="summary__info-icon-wrap">
            <img
              class="summary__info-icon calendar"
              src="@/img/calendar.svg"
              alt="icon"
            />
          </div>
          <p class="summary__info-text">{{ today }}</p>
        </div>
      </div>
    </div>

    <Error v-if="weatherStore.isError" />
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { capitalizeFirstLetter } from "../utils/index";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputGroup from "primevue/inputgroup";
import { useWeatherStore } from "../stores/weather";

const weatherStore = useWeatherStore();

// import image
const getImageUrl = (path) => {
  return new URL(`../img/weather-main/${path}.png`, import.meta.url).href;
};

const today = new Date().toLocaleString("en-EN", {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const props = defineProps({
  city: String,
  weatherInfo: {
    type: [Object, null],
  },
});
const cityInput = ref(props.city);
</script>

<style lang="scss" scoped>
.summary {
  @include CardLayout;
  display: block;
  &-title {
    margin-bottom: 10px;
  }

  &-group {
  }

  &__input-group {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #000000;
    height: 40px;
    border-radius: 12px;
    margin-bottom: 15px;
  }

  &__input {
    width: 100%;
    height: 100%;
    padding: 0 0 0 10px;
    flex-grow: 1;
  }

  &__input-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: 100%;
    cursor: pointer;
    svg {
      height: 24px;
      width: 24px;
    }
  }

  &__img-wrapper {
    width: 80px;
    margin-bottom: 20px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__temp {
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  &__info {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-bottom: 10px;
  }

  &__info-icon {
    height: 100%;
    width: 100%;
    object-fit: cover;
    &-wrap {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      & .calendar {
        width: 15px;
        height: 15px;
      }
    }
  }

  &__info-text {
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
  }

  .loading {
    width: 30px;
    margin: 0 10px;
    color: #a0a0a0;
  }
}

.line {
  display: block;
  margin: 25px 0 20px 0;
  width: 100%;
  height: 2px;
  background-color: #ffffff4b;
}
</style>
