<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
</script>

<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <!-- 菜单栏 -->
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部菜单 -->
          <common-header></common-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.home, .el-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  .el-main {
    background-color: #F0F2F5;
  }
}
</style>
