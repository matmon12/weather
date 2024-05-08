<template>
  <div class="sunset">
    <h6 class="sunset-title">Sunrise and sunset</h6>
    <div ref="graphic" class="sunset-graphic">
      <div class="sunset-graphic__inner">
        <div :style="{ width: `${lightWidth}px` }" class="sunset-graphic-back"></div>
        <i-ph:sun-fill :style="{ left: sunPosLeft, bottom: sunPosBottom }" />
      </div>
    </div>
    <div class="sunset__box">
      <div class="sunset__info">
        <img class="sunset__info-icon" src="@/img/sun.svg" alt="sun" />
        <p class="sunset__info-text">Sunrise</p>
        <p class="sunset__info-time">{{ getTime(weatherInfo?.sys?.sunrise + weatherInfo?.timezone) }}</p>
      </div>
      <div class="sunset__info">
        <img class="sunset__info-icon" src="@/img/sun.svg" alt="sun" />
        <p class="sunset__info-text">Sunset</p>
        <p class="sunset__info-time">{{ getTime(weatherInfo?.sys?.sunset + weatherInfo?.timezone) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps, computed } from "vue";
import {getTime} from '@/utils/index'

const sunPosLeft = ref(0);
const sunPosBottom = ref(0);
const lightWidth = ref(0);
const graphic = ref();

const props = defineProps({
  weatherInfo: {
    type: Object
  }
})


const resizeHandler = (e) => {
  setSunPosition();
};

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  setSunPosition();
});

watch(() => props.weatherInfo?.sys?.sunset, (newValue) => {
  setSunPosition();
})

const setSunPosition = () => {
  // промежуток между закатом и рассветом
  const betweenTime = props.weatherInfo?.sys?.sunset - props.weatherInfo?.sys?.sunrise;
  const currentTime = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' });
  const currentTimeSec = (currentTime.split(':')[0] * 3600) + (currentTime.split(':')[1] * 60) + Number(currentTime.split(':')[2]);
  const currentTimeLocal = currentTimeSec + props.weatherInfo?.timezone;
  // проверка выхода времени за пределы суток
  const timeMoreDay = currentTimeLocal >= 86400 ? currentTimeLocal - 86400 : currentTimeLocal;
  const timeLessDay = timeMoreDay < 0 ? 86400 + timeMoreDay : timeMoreDay;
  // разница между рассветом и текущим временем
  const timeSunrize = new Date((props.weatherInfo?.sys?.sunrise + props.weatherInfo?.timezone) * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' });
  const timeSunrizeSec = (timeSunrize.split(':')[0] * 3600) + (timeSunrize.split(':')[1] * 60) + Number(timeSunrize.split(':')[2]);
  const timeCurAndSunrise = timeLessDay - timeSunrizeSec;
  // угол солнца
  var angle = 1 / betweenTime * timeCurAndSunrise;
  const angleCheck = angle > 1 ? angle = 1 : angle < 0 ? angle = 0 : angle;
  
  // line
  var radius = graphic.value.offsetWidth / 2;
  var angleInRadians = (angleCheck * Math.PI);
  sunPosLeft.value = radius - radius * Math.cos(angleInRadians);
  sunPosBottom.value = radius * Math.sin(angleInRadians);

  // back
  lightWidth.value = radius - radius * Math.cos(angleInRadians);
};

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});

</script>

<style lang="scss" scoped>
.sunset {
  @include CardValue;

  &__box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 15px 15px;
  }

  &__info {
    &:nth-child(2) {
      text-align: right;
      .sunset__info-icon {
        transform: rotateY(180deg);
      }
    }
  }

  &__info-icon {
    width: 24px;
  }

  &__info-text {
    color: $gold;
    font-size: 14px;
  }

  &__info-time {
    font-size: 15px;
  }
}
.sunset-title {
  font-size: 14px;
}

.sunset-graphic {
  height: 0;
  padding-bottom: 35%;
  position: absolute;
  width: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  &__inner{
    border-top: 2px solid $gold;
    border-left: 2px solid $gold;
    border-right: 2px solid $gold;
    border-radius: 100px 100px 0 0;
    border-bottom: 1px solid transparent;
    overflow: hidden;

  }
  &-back {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, $gold 100%);
    width: 50px;
    padding-bottom: 50%;
  }
  svg {
    color: $gold;
    position: absolute;
    width: 30px;
    transform: translate(-50%, 50%);
  }
  &::before {
    content: "";
    height: 2px;
    width: 9px;
    background-color: $gold;
    position: absolute;
    left: 0;
    transform: translateX(calc(-50% + 1px));
    bottom: -1px;
    border-radius: 3px;
  }
  &::after {
    content: "";
    height: 2px;
    width: 8px;
    background-color: $gold;
    position: absolute;
    right: 0;
    transform: translateX(calc(50% - 1px));
    bottom: -1px;
    border-radius: 3px;
  }
}
</style>
