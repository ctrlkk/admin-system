<script setup>
import {CirclePlusFilled, DeleteFilled, HomeFilled, Menu, MoreFilled, Tools, User} from "@element-plus/icons-vue";

let props = defineProps({
  /**
   * 图标名
   */
  iconName: {
    type: String
  }
});
</script>

<template>
  <!-- 图标映射,将element-plus的元素图标转化为属性图标 -->
  <el-icon v-if="props.iconName==='HomeFilled'"><HomeFilled /></el-icon>
  <el-icon v-if="props.iconName==='User'"><User /></el-icon>
  <el-icon v-if="props.iconName==='CirclePlusFilled'"><CirclePlusFilled /></el-icon>
  <el-icon v-if="props.iconName===`DeleteFilled`"><DeleteFilled /></el-icon>
  <el-icon v-if="iconName===`MoreFilled`"><MoreFilled /></el-icon>
  <el-icon v-if="iconName===`Tools`"><Tools /></el-icon>
  <el-icon v-if="iconName===`Menu`"><Menu /></el-icon>
</template>

<style scoped lang="scss">

</style>
