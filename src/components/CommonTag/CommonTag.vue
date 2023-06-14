<script setup>

import {MoreFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="home">
    <div>
      <el-tag>首页</el-tag>
      <el-tag>首页</el-tag>
      <el-tag>首页</el-tag>
      <el-tag>首页</el-tag>
      <el-tag>首页</el-tag>
    </div>
    <div>
      <el-icon>
        <el-dropdown>
          <MoreFilled />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>关闭所有标签页</el-dropdown-item>
              <el-dropdown-item>关闭其他标签页</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  border-bottom: #e1e4e7 solid;
  height: 25px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px !important;
  &>div {
    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>
