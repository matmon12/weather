<template>
  <div class="weather" :style="{ background: `url(${imageBackHome}), #fff` }">
    <div class="weather-wrapper">
      <div class="container">
        <div class="weather__inner">
          <WeatherSummary
            :class="['weather-box', { 'is-error': weatherStore.isError }]"
            :city="city"
            :weatherInfo="weatherInfo"
            @city-input="
              (cityInput) => {
                (city = cityInput), getWeatherInfo();
              }
            "
          />
          <WeatherHighlights
            v-if="!weatherStore.isError"
            class="weather-box"
            :weatherInfo="weatherInfo"
          />
          <WeatherCoord
            v-if="!weatherStore.isError"
            class="weather-box"
            :coord="weatherInfo?.coord"
          />
          <WeatherHumidity
            v-if="!weatherStore.isError"
            class="weather-box"
            :humidity="weatherInfo?.main?.humidity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import imageBackHome from "@/img/back-home.jpg";
import axiosApiInstance from "../../api.js";
import { useWeatherStore } from "../stores/weather";

const baseUrl = import.meta.env.VITE_BASE_URL_WEATHER;
const city = ref("Oryol");
const weatherInfo = ref();
const weatherStore = useWeatherStore();

onMounted(() => {
  getWeatherInfo();
});

const getWeatherInfo = async () => {
  weatherStore.loading = true;
  const data = await axiosApiInstance
    .get(`${baseUrl}?q=${city.value}&units=metric`)
    .then((response) => {
      weatherInfo.value = response.data;
      weatherStore.isError = false;
    })
    .catch((err) => {
      weatherStore.isError = true;
    })
    .finally(() => {
      weatherStore.loading = false;
    });
};
</script>

<style scoped lang="scss">
.weather {
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff07;
    backdrop-filter: blur(10px);
  }

  &__inner {
    overflow: hidden;
    background-color: #4d4d4d73;
    box-shadow: 0px 0px 40px #000000c5;
    width: 100%;
    height: minmax(550px, 600px);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    gap: 15px;
    position: relative;
    z-index: 0;
    margin: 20px 0;
  }
  &-box {
    &:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 5;
      &.is-error {
        grid-column-end: 15;
      }
    }
    &:nth-child(2) {
      grid-column-start: 5;
      grid-column-end: 15;
    }
    &:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: 8;
    }
    &:nth-child(4) {
      grid-column-start: 8;
      grid-column-end: 15;
    }
  }
}
</style>
