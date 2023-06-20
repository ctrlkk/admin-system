<script setup>
import { ref } from "vue";
import {useDark} from "@vueuse/core";
import DayNightSwitch from "@/components/Button/DayNightSwitch.vue";

let value1 = ref(180);
let isDark = useDark();

</script>

<template>
  <div class="home">
    <day-night-switch :size="value1" v-model="isDark"></day-night-switch>
    <el-slider v-model="value1" :min="30" :max="1000" />
  </div>
</template>

<style scoped lang="scss">
</style>
