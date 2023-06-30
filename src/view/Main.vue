<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import CommonTag from "@/components/CommonTag/CommonTag.vue";
import {reactive, ref} from "vue";
import {useDark} from "@vueuse/core";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";

let include = reactive([]); // 路由缓存名单
let isDark = useDark(); // 控制暗黑模式
let loading = ref(false); // 是否正在加载路由
let {menuData} = storeToRefs(tab());

function clickMenu() {
  loading.value = true;
}

/**
 * 在元素被插入到 DOM 之前被调用
 * @param el
 */
function onBeforeEnter(el) {
  loading.value = false;
}
</script>

<template>
  <div :class="{'home': true, 'dark': isDark}">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边菜单栏 -->
        <common-aside :data="menuData" @click-menu="clickMenu"></common-aside>
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
            <el-main v-loading="loading" style="padding: 0;width: 100%;height: 100%">
              <el-scrollbar>

                <router-view v-slot="{ Component }">
                  <!-- 设置路由切换动画 -->
                  <transition
                      @before-enter="onBeforeEnter"
                      mode="out-in"
                      name="slide">
                    <!-- 设置缓存路由 -->
                    <keep-alive :include="include">
                      <component :is="Component" style="height: 100%;width: 100%"/>
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

/* 路由切换动画 滑动 */
.slide-leave-to {
  /* 定义从右往左出去 */
  //transform: translateX(-100%);
  transform: translateX(20px);
  opacity: 0;
}

.slide-enter-from {
  /* 定义从左往右进来 */
  //transform: translateX(100%);
  transform: translateX(20px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  /* 定义进入结束和离开开始的位置为中间 */
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  /* 定义过渡的时间和方式 */
  transition: all 0.3s ease;
}

</style>
