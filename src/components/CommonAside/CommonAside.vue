<script setup>
import AMenu from "./Menu.vue"
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";
import {useWindowSize} from "@vueuse/core";

const router = useRouter();
const route = useRoute();

let props = defineProps({
  backgroundColor: {
    type: String,
    default: "#001529"
  },
  textColor: {
    type: String,
    default: "#B3B9BF"
  },
  activeTextColor: {
    type: String,
    default: "#FFFFFF"
  },
  // menu数据
  data: {
    type: Array
  }
});

/**
 * clickMenu 菜单点击事件
 * @type {EmitFn<string[]>}
 */
let emits = defineEmits(['clickMenu']);

// 控制页面的收放
let {isCollapse} = storeToRefs(tab());
// menu默认激活菜单的index
let activeIndex = computed(() => getMenuDataToIndex(props.data, route.path, null));

/**
 * menu点击事件
 * 页面切换
 * @param item menu数据
 * @param index menu下标
 */
function clickMenu(item, index) {
  if (route.path !== item.path) {
    emits('clickMenu', item, index);
    router.push(item.path);
  }
}

/**
 * 获取menuData中指定路由路径所在的index
 * @param arr data
 * @param path 路由路径
 * @param index 上一次循环的index
 * @return {null} 为空则未找到
 */
function getMenuDataToIndex(arr, path, index) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    let index2;
    // 拼接index
    if (index) {
      index2 = `${index}-${i}`;
    } else {
      index2 = `${i}`;
    }
    // 找到了则返回index
    if (value.path === path) {
      return index2;
    }
    // 有子选项则递归
    if (value.children) {
      let data = getMenuDataToIndex(value.children, path, index2);
      if (data) {
        return data;
      }
    }
  }
  return null;
}

// 窗体大小
const {width, height} = useWindowSize();

/**
 * 判断是否使用手机布局
 */
let isMobile = computed(() => {
  if (width.value > 500) {
    return false;
  }
  if (width.value < 500) {
    return true;
  }
});
</script>

<template>
  <el-scrollbar :style="`background-color: ${backgroundColor}`">
    <!-- 菜单页 -->
    <el-menu
        :class="{'mobile': isMobile, 'show': !isCollapse}"
        :background-color="backgroundColor"
        :active-text-color="activeTextColor"
        :text-color="textColor"
        :unique-opened="true"
        :collapse="isCollapse"
        :default-active="activeIndex"
    >
      <!-- 这个div用来撑开menu，使menu在展开状态下宽度不低于200px -->
      <div style="width: 200px"></div>

      <div class="logo" :style="`color: ${activeTextColor}`">
        <h3 v-show="!isCollapse">{{ $t('通用后台管理系统') }}</h3>
        <h3 v-show="isCollapse">{{ $t('后台') }}</h3>
      </div>

      <a-menu :data="data" @click-menu="clickMenu"></a-menu>
    </el-menu>

    <div :class="{'mask-layer': true, 'show': !isCollapse, 'mobile': isMobile}" @click="isCollapse = true"></div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-menu {
  .logo {
    display: flex;
    height: 50px;
    &>h3 {
      margin: auto;
      white-space: nowrap;
    }
  }
  height: 100%;
  border-right: none;
}

.el-menu.mobile {
  position: fixed;
  z-index: 2002;
  display: none;
}

.el-menu.mobile.show {
  display: inline;
}

.mask-layer.mobile {
  transition: 0.5s;
  z-index: 2001;
  position: fixed;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  width: 0;
}

.mask-layer.mobile.show {
  width: 100%;
}
</style>
