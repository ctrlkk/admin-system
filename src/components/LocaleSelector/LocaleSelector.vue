<script setup>
import { LanguageFilled } from "@vicons/material"
let languages = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' }
]

</script>

<template>
  <div class="home">
    <el-dropdown trigger="click" style="margin-right: 30px">
      <n-icon size="20" style="cursor: pointer">
        <LanguageFilled/>
      </n-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="(item, index) in languages"
              :key="index"
              :disabled="this.$i18n.locale === item.value"
              @click="this.$i18n.locale = item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: auto !important;
  height: auto !important;
}
</style>
