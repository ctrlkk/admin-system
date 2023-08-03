<script setup>
import CommonAside from "@/components/CommonAside/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader/CommonHeader.vue";
import CommonTag from "@/components/CommonTabs/CommonTabs.vue";
import {reactive, ref} from "vue";
import {useDark} from "@vueuse/core";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";
import _ from "lodash";
import {ElMessage} from "element-plus";
import {system} from "@/store/system";

let include = reactive([]); // 路由缓存名单
let isDark = useDark(); // 控制暗黑模式
let {menuData} = storeToRefs(tab());
const {size} = storeToRefs(system()); // 全局控件大小

let loading = ref(false); // 是否正在加载路由
let isCollapse = ref(true); // 是否收起顶部菜单

let timeId;

/**
 * 进入加载状态
 */
function clickMenu() {
  loading.value = true;
  timeId = setTimeout(() => {
    if (loading.value) {
      ElMessage.error("响应超时");
      loading.value = false;
    }
  }, 5000);

}

/**
 * 取消加载状态
 * 在元素被插入到 DOM 之前被调用
 * @param el
 */
function onBeforeEnter(el) {
  clearTimeout(timeId);
  loading.value = false;
}

/**
 * 滚动事件
 * @param scroll {scrollTop} 距离顶部的距离
 * @param scroll {scrollLeft} 距离左边的距离
 */
let scroll = _.debounce(function (scroll) {
  if (scroll.scrollTop > 500) {
    isCollapse.value = false;
  }
  if (scroll.scrollTop < 500) {
    isCollapse.value = true;
  }
}, 100);
</script>

<template>
  <div :class="{'main': true, 'dark': isDark}">
    <el-container>

      <el-aside width="auto">
        <!-- 侧边菜单栏 -->
        <common-aside :data="menuData" @click-menu="clickMenu"></common-aside>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 顶部菜单 -->
          <common-header v-show="isCollapse" :data="menuData" style="height: 50px;"></common-header>
          <div style="width: 100%;border: 1px solid var(--el-border-color);"></div>
          <!-- 标签页 -->
          <common-tag v-model="include" :data="menuData"></common-tag>
        </el-header>
        <el-main v-loading="loading" class="box">
          <router-view v-slot="{ Component }">
            <!-- 设置路由切换动画 -->
            <transition
                mode="out-in"
                name="slide"
                @before-enter="onBeforeEnter">
              <!-- 设置缓存路由 -->
              <keep-alive :include="include">
                <component :is="Component" class="box"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main, .el-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  * {
    transition: 0.5s;
  }

  .box {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .el-header {
    height: auto;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid var(--el-border-color);
  }

  .el-main {
    background-color: #F0F2F5;
  }
}

/* 暗色模式下的样式 */
.main.dark {
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
