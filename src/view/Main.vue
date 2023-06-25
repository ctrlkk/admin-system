<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import CommonTag from "@/components/CommonTag/CommonTag.vue";
import {reactive, ref} from "vue";
import {useDark} from "@vueuse/core";
import {getMenuData} from "@/api/menu";

let include = reactive([]); // 路由缓存名单
let isDark = useDark(); // 控制暗黑模式
let menuData = ref([]);

(async () => {
  menuData.value = (await getMenuData()).data;
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
                <router-view v-slot="{ Component }">

                  <!-- 路由切换动画 -->
                  <transition :duration="{ enter: 500, leave: 300 }" mode="out-in" name="slide-fade">
                    <!-- 缓存路由 -->
                    <keep-alive :include="include">
                      <component :is="Component"/>
                    </keep-alive>
                  </transition>

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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.3;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>
