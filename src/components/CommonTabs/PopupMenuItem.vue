<script setup>

</script>

<template>
  <div class="popup-menu-box-item">
    <el-text>
      <slot/>
    </el-text>
  </div>
</template>

<style lang="scss" scoped>
.popup-menu-box-item {
  font-size: 14px;
  width: 100%;
  height: 30px;
  cursor: pointer;
  line-height: 30px;

  .el-text {
    vertical-align: middle;
    padding-left: 20px;
    padding-right: 20px;
  }

  &:hover {
    background-color: rgba(86, 157, 253, 0.1);

    .el-text {
      color: #569eff;
    }
  }
}
</style>
