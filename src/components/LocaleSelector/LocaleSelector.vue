<script setup>
import {LanguageFilled} from "@vicons/material"
import {useI18n} from "vue-i18n";
import {reactive} from "vue";

let languages = reactive([
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' }
]);

const i18n = useI18n();
</script>

<template>
  <div class="home">
    <el-dropdown trigger="click">
      <el-icon size="20" style="cursor: pointer">
        <LanguageFilled/>
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="(item, index) in languages"
              :key="index"
              :disabled="i18n.locale.value === item.value"
              @click="i18n.locale.value = item.value"
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
