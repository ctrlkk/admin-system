<script setup>
import CommonTag from "@/components/CommonTabs/CommonTabs.vue";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";
import {reactive} from "vue";

let {menuData} = storeToRefs(tab());
let include = reactive([]); // 路由缓存名单
</script>

<template>
  <div
      style="width: 100%;height: 100%;display: flex;flex-direction: row;justify-content: center;align-content: center;">

    <div style="width: 500px;height: 30px;background-color: var(--el-border-color);">
      <common-tag v-model="include" :data="menuData"></common-tag>
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>
