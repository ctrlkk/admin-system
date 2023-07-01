<script setup>
import Icons from "@/components/CommonAside/Icons.vue";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";

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
  emits('clickMenu', item, index);
  if (route.path !== item.path) {
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

</script>

<template>
  <el-scrollbar :style="`background-color: ${backgroundColor}`">
    <!-- 菜单页 -->
    <el-menu
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

      <!-- 循环所有子路由 -->
      <template v-for="(item, i) in data">
        <!-- 如果有子路由 -->
        <el-sub-menu v-if="item.children" :index="`${i}`">
          <template #title>
            <icons :icon-name="item.icon"></icons>
            <span>{{item.label}}</span>
          </template>

          <!-- 有子路由继续循环 -->
          <template v-for="(item2, j) in item.children">
            <!-- 分组 -->
            <el-menu-item-group v-if="item2.group">
              <template #title><span>{{item2.label}}</span></template>
              <el-menu-item v-for="(item3, k) in item2.children" :index="`${i}-${j}-${k}`" @click="clickMenu(item3, `${i}-${j}-${k}`)">
                <icons :icon-name="item3.icon"></icons>
                <span>{{item3.label}}</span>
              </el-menu-item>
            </el-menu-item-group>

            <!-- 不分组 -->
            <template v-else>
              <!-- 没有三级路由 -->
              <el-menu-item v-if="!item2.children" :index="`${i}-${j}`" @click="clickMenu(item2, `${i}-${j}`)">
                <icons :icon-name="item2.icon"></icons>
                <span>{{item2.label}}</span>
              </el-menu-item>

              <!-- 有三级路由 -->
              <el-sub-menu v-else :index="`${i}-${j}`">
                <template #title>
                  <icons :icon-name="item2.icon"></icons>
                  <span>{{item2.label}}</span>
                </template>
                <el-menu-item v-for="(item3, k) in item2.children" :index="`${i}-${j}-${k}`" @click="clickMenu(item3, `${i}-${j}-${k}`)">
                  <icons :icon-name="item3.icon"></icons>
                  <span>{{item3.label}}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>

          </template>
        </el-sub-menu>

        <!-- 如果没有子路由 -->
        <el-menu-item v-else :index="`${i}`" @click="clickMenu(item)">
          <icons :icon-name="item.icon"></icons>
          <template #title>{{item.label}}</template>
        </el-menu-item>
      </template>

    </el-menu>
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
</style>
