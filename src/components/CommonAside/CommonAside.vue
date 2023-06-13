<script setup>
import Icons from "@/components/Icons/Icons.vue";
import {info, error, warn} from "@/utils/log"
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import store from "@/store";

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
  }
});

function clickMenu(item) {
  info(item);
  if (route.path !== item.path) {
    router.push(item.path);
  }
}

let isCollapse = computed((()=>{
  return store.state.tab.isCollapse;
}));

let menuData = [
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "HomeFilled",
    url: ""
  },
  {
    path: "/home",
    name: "home",
    label: "用户管理",
    icon: "User",
    url: "",
    children: [
      {
        path: "/home",
        name: "home",
        label: "用户增删改",
        icon: "MoreFilled",
        url: "",
        children: [
          {
            path: "/home",
            name: "home",
            label: "添加用户",
            icon: "CirclePlusFilled",
            url: ""
          },
          {
            path: "/home",
            name: "home",
            label: "删除用户",
            icon: "DeleteFilled",
            url: ""
          },
          {
            path: "/home",
            name: "home",
            label: "修改用户用户",
            icon: "Tools",
            url: ""
          },
          {
            path: "/home",
            name: "home",
            label: "查询用户",
            icon: "Menu",
            url: ""
          },
        ]
      },
      {
        path: "/home",
        name: "home",
        label: "用户设置",
        icon: "MoreFilled",
        url: "",
        children: [
          {
            path: "/home",
            name: "home",
            label: "用户权限",
            icon: "",
            url: ""
          },
          {
            path: "/home",
            name: "home",
            label: "角色",
            icon: "",
            url: ""
          }
        ]
      }
    ]
  },
]
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
    >
      <!-- 这个div用来撑开menu，使menu在展开状态下宽度不低于200px -->
      <div style="width: 200px"></div>

      <div class="logo" :style="`color: ${activeTextColor}`">
        <h3 v-show="!isCollapse">通用后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
      </div>

      <!-- 循环所有子路由 -->
      <template v-for="(item, i) in menuData">
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
              <el-menu-item v-for="(item3, k) in item2.children" :index="`${i}-${j}-${k}`" @click="clickMenu(item3)">
                <icons :icon-name="item3.icon"></icons>
                <span>{{item3.label}}</span>
              </el-menu-item>
            </el-menu-item-group>

            <!-- 不分组 -->
            <template v-else>
              <!-- 没有三级路由 -->
              <el-menu-item v-if="!item2.children" :index="`${i}-${j}`" @click="clickMenu(item2)">
                <icons :icon-name="item2.icon"></icons>
                <span>{{item2.label}}</span>
              </el-menu-item>

              <!-- 有三级路由 -->
              <el-sub-menu v-else :index="`${i}-${j}`">
                <template #title>
                  <icons :icon-name="item2.icon"></icons>
                  <span>{{item2.label}}</span>
                </template>
                <el-menu-item v-for="(item3, k) in item2.children" :index="`${i}-${j}-${k}`" @click="clickMenu(item3)">
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
