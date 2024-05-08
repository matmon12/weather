<template>
  <div class="error">
    <i-tabler:error-404 />
    <p class="error-text">Oooops! City not found</p>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.error{
  width: 100%;
  background-color: #ffffff2c;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  &-text{
    font-size: 24px;
    color: rgb(189, 78, 78);
  }
  svg{
    width: 200px;
    color: rgb(189, 78, 78);
  }
}
</style>