<script setup>
import {Expand, Fold} from "@element-plus/icons-vue";
import store from "@/store";
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import { useDark, useToggle } from '@vueuse/core'
import LocaleSelector from "@/components/LocaleSelector/LocaleSelector.vue";
import DayNightSwitch from "@/components/Button/DayNightSwitch.vue";

let props = defineProps({
  // menu数据
  data: {
    type: Array,
    default: []
  }
});

let isCollapse = computed(() => store.state.tab.isCollapse);
let breadcrumbData = computed(()=> {
  return getMenuDataToPaths(props.data, useRoute().path, null);
});
const isDark = useDark(); // 是否暗色模式
// const isDark = ref(false);

/**
 * 收放侧边栏按钮
 */
function click() {
  store.commit("collapseMenu");
}

/**
 * 监听路由变化
 */
watch(useRoute(), function (to, from) {
  // breadcrumbData.value = getMenuDataToPaths(data.value, to.path, null);
}, {
  deep: true
});

/**
 * 获取menuData中指定路由路径所在的路径
 * @param arr data
 * @param path 路由路径
 * @param paths 上一次循环的路径
 * @return {null} 为空则未找到
 */
function getMenuDataToPaths(arr, path, paths) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    let paths2 = [];
    // 拼接index
    if (paths) {
      paths2 = paths;
    }
    // 找到了则返回index
    if (value.path === path) {
      paths2.push(value);
      return paths2;
    }
    // 有子选项则递归
    if (value.children) {
      paths2.push(value);
      let data = getMenuDataToPaths(value.children, path, paths2);
      if (data) {
        return data;
      }
    }
  }
  return null;
}

</script>

<template>
<div class="home">
  <!-- 按钮以及面包屑 -->
  <div>
    <el-icon @click="click" size="20" style="cursor: pointer;">
      <Fold v-show="!isCollapse" />
      <Expand v-show="isCollapse" />
    </el-icon>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!-- 头像区 -->
  <div>
<!--    <el-switch v-model="isDark" style="margin-right: 20px"></el-switch>-->
    <day-night-switch :size="50" v-model="isDark" style="margin-right: 20px"></day-night-switch>
    <locale-selector style="margin-right: 20px" />

    <el-dropdown trigger="click" style="margin-right: 30px">
      <el-avatar style="cursor: pointer;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ $t('个人中心') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('退出账号') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &>div {
    display: flex;
    align-items: center;
    &>.el-breadcrumb {
      margin-left: 10px;
    }
  }
}
</style>
