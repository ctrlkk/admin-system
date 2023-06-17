<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import CommonTag from "@/components/CommonTag/CommonTag.vue";
import {computed, reactive} from "vue";
import store from "@/store";
import router from "@/router";

let include = computed(() => store.getters.getKeepAliveInclude);


(async () => {
  // 初始化数据
  await store.dispatch("init");
})();
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

          <el-container>
            <el-header style="padding: 0" height="auto">
              <!-- 标签页 -->
              <common-tag></common-tag>
            </el-header>
            <el-main style="padding: 0">
              <el-scrollbar>
                <!-- 缓存路由 -->
                <router-view v-slot="{ Component }">
                  <keep-alive :include="include">
                    <component :is="Component" />
                  </keep-alive>
                </router-view>
              </el-scrollbar>
            </el-main>
          </el-container>

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
