<script setup>
import {
  Avatar,
  CirclePlusFilled,
  DeleteFilled,
  FullScreen,
  HomeFilled,
  Link,
  Menu,
  MessageBox,
  More,
  MoreFilled,
  Open,
  Tools,
  UploadFilled,
  User
} from "@element-plus/icons-vue";
import {StatusChange} from "@vicons/carbon";
import {FistRaised} from "@vicons/fa"

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
  <el-icon v-if="iconName===`Avatar`"><Avatar/></el-icon>
  <el-icon v-if="iconName==='StatusChange'"><StatusChange/></el-icon>
  <el-icon v-if="iconName==='FistRaised'"><FistRaised/></el-icon>
  <el-icon v-if="iconName==='Link'"><Link/></el-icon>
  <el-icon v-if="iconName==='Open'"><Open/></el-icon>
  <el-icon v-if="iconName==='FullScreen'"><FullScreen/></el-icon>
  <el-icon v-if="iconName==='MessageBox'"><MessageBox/></el-icon>
  <el-icon v-if="iconName==='More'"><More/></el-icon>
  <el-icon v-if="iconName==='UploadFilled'"><UploadFilled /></el-icon>
</template>

<style scoped lang="scss">

</style>
