<template>
  <div class="highlight">
    <h2 class="highlight-title">Today's Highlight</h2>
    <div class="highlight__inner">
      <Wind class="highlight-card" :wind="weatherInfo?.wind" />
      <Pressure class="highlight-card" :pressure="weatherInfo?.main?.pressure" />
      <Sunset
        class="highlight-card"
        :weatherInfo="weatherInfo"
      />
      <WeatherInfo
        class="highlight-card"
        :data="weatherData[0]"
        :value="weatherInfo?.wind?.gust"
      />
      <WeatherInfo
        class="highlight-card"
        :data="weatherData[1]"
        :value="weatherInfo?.main?.feels_like"
      />
      <WeatherInfo
        class="highlight-card"
        :data="weatherData[2]"
        :value="weatherInfo?.clouds?.all"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import imageWind from "@/img/gusts.svg";
import imageHumidity from "@/img/humidity.svg";
import imageCloud from "@/img/cloud.svg";

const props = defineProps({
  weatherInfo: {
    type: Object,
  },
});

const weatherData = ref([
  {
    id: 0,
    title: "Wind gusts",
    name: "m/s",
    icon: imageWind,
    text: "Learn more about gusts",
  },
  {
    id: 1,
    title: "Feels like",
    name: "°С",
    icon: imageHumidity,
    text: "How hot or cold it really feels",
  },
  {
    id: 2,
    title: "Cloudness",
    name: "%",
    icon: imageCloud,
    text: "The sky fraction obscured by clouds",
  },
]);
</script>

<style lang="scss" scoped>
.highlight {
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
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(3, 1fr);
  }

  &-card {
    &:nth-child(-n + 3) {
      height: 0;
      padding-bottom: calc(100% - 15px);
      display: flex;
      flex-direction: column;
    }
  }
}

.highlight-title {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
