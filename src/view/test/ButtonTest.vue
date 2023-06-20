<script setup>
import DayNightToggleButton from "@/components/Button/DayNightToggleButton.vue";
import { ref } from "vue";

let value1 = ref(180);
let isNight = ref(false);

</script>

<template>
  <div class="home">
    <day-night-toggle-button :size="value1" v-model="isNight"></day-night-toggle-button>
    <el-slider v-model="value1" :min="100" :max="300" />
  </div>
</template>

<style scoped lang="scss">
</style>
