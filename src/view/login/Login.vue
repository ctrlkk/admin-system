<script setup>

import CommonLogin from "@/view/login/components/CommonLogin.vue";
import Sea from "@/view/login/components/Sea.vue";
</script>

<template>
  <div class="home">
    <common-login></common-login>
    <sea></sea>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
