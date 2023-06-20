<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import CommonTag from "@/components/CommonTag/CommonTag.vue";
import {computed, reactive} from "vue";
import store from "@/store";
import {useDark} from "@vueuse/core";

// let include = computed(() => store.getters.getKeepAliveInclude);
let include = reactive([]);
let isDark = useDark();
let menuData = computed(() => store.getters.getMenuData);

(async () => {
  // 初始化数据
  await store.dispatch("init");
})();
</script>

<template>
  <div :class="{'home': true, 'dark': isDark}">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边菜单栏 -->
        <common-aside :data="menuData"></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部菜单 -->
          <common-header :data="menuData"></common-header>
        </el-header>
        <el-main>
          <!---------------主内容区---------------->
          <el-container>
            <el-header style="padding: 0;" height="auto">
              <!-- 标签页 -->
              <common-tag :data="menuData" v-model="include"></common-tag>
            </el-header>
            <el-main style="padding: 0;width: 100%;height: 100%">
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
          <!------------------------------->
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
    transition: 0.5s;
    background-color: #F0F2F5;
    width: 100%;
    height: 100%;
  }
}

// 暗色模式下的样式
.home.dark {
  .el-main {
    background-color: #121212;
  }
}
</style>
