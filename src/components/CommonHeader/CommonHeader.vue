<script setup>
import {Expand, Fold} from "@element-plus/icons-vue";
import store from "@/store";
import {computed} from "vue";


let isCollapse = computed((()=>{
  return store.state.tab.isCollapse;
}));

function click() {
  store.commit("collapseMenu");
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
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!-- 头像区 -->
  <div>
    <el-dropdown trigger="click" style="margin-right: 30px">
      <el-avatar style="cursor: pointer;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
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
