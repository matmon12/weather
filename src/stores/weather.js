import { defineStore } from "pinia";
import {ref} from 'vue';

export const useWeatherStore = defineStore('weather', () => {
  const city = ref('Oryol');
  const loading = ref(false);
  const isError = ref(false); 

  return {city, loading, isError};
})