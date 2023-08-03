<script setup>
import {ref} from "vue"

let value1 = ref("只需要为你的路由添加name属性，即可拥有缓存，无需任何额外配置");
let value2 = ref(0);

</script>

<template>
  <div
      style="width: 100%;height: 100%;display: flex;flex-direction: row;justify-content: center;align-content: center;">
    <el-form label-position="top">
      <el-form-item label="请输入数据，这些数据在当前页面标签关闭之前，会被缓存">
        <el-input v-model="value1" :autosize="{minRows: 10}" type="textarea"></el-input>
        <el-input-number v-model="value2"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>

</style>
