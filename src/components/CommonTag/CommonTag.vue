<script setup>
import {MoreFilled} from "@element-plus/icons-vue";
import _ from "lodash";
import {info} from "@/utils/log";
import {useRoute} from "vue-router";
import {reactive, ref, watch} from "vue";
import router from "@/router";

const route = useRoute();
let tags = reactive([]);

watch(useRoute(), function (to, from) {
  for (let key in tags) {
    if (tags[key].name === to.name) {
      return;
    }
  }
  if (to.path === '/') {
    return;
  }
  tags.push({
    path: to.path,
    name: to.name
  });
}, {
  deep: true
});

function tagClick(tag) {
  router.push({name: tag.name});
}

function tagClose(index) {
  if (tags[index].name === route.name) {
    if (index === 0) {
      router.push("/");
    } else {
      router.push({name: tags[index - 1].name});
    }
  }
  tags.splice(index, 1);
}
</script>

<template>
  <div class="home">
    <div>
      <el-tag @click="tagClick({name: '首页'})" :effect="useRoute().path === '/' ? 'dark' : 'light'">首页</el-tag>
      <el-tag
          v-for="(item, index) in tags"
          :key="index"
          closable
          :effect="route.name === item.name ? 'dark' : 'light'"
          @click="tagClick(item)"
          @close="tagClose(index)"
      >
        {{item.name}}
      </el-tag>
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
  padding-bottom: 15px !important;
  margin-bottom: 10px !important;
  &>div {
    .el-tag {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
