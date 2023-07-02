<script setup>
import AMenu from "./Menu.vue"
import Icons from "@/components/CommonAside/Icons.vue";

let props = defineProps({
  // menu数据
  data: {
    type: Array
  },
  // 上一级的下标，用于组件递归
  index: {
    type: String,
    default: ""
  }
});

/**
 * clickMenu 菜单点击事件
 * @type {EmitFn<string[]>}
 */
let emits = defineEmits(['clickMenu']);

/**
 * menu点击事件
 * 页面切换
 * @param item menu数据
 * @param index menu下标
 */
function clickMenu(item, index) {
  emits('clickMenu', item, index);
}
</script>

<template>
  <!-- 循环所有子路由 -->
  <template v-for="(item, i) in data">
    <!-- 如果有子路由 -->
    <el-sub-menu v-if="item.children" :index="`${index}${i}`">
      <template #title>
        <icons :icon-name="item.icon"></icons>
        <span>{{ item.label }}</span>
      </template>

      <!-- 是否需要分组 -->
      <el-menu-item-group v-if="item.group">
        <template #title><span>{{ item.label }}</span></template>
        <!-- 组件递归 -->
        <a-menu :data="item.children" :index="`${index}${i}-`" @click-menu="clickMenu"></a-menu>
      </el-menu-item-group>

      <!-- 组件递归 -->
      <a-menu v-else :data="item.children" :index="`${index}${i}-`" @click-menu="clickMenu"></a-menu>

    </el-sub-menu>

    <!-- 如果没有子路由 -->
    <el-menu-item v-else :index="`${index}${i}`" @click="clickMenu(item)">
      <icons :icon-name="item.icon"></icons>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>

</style>
