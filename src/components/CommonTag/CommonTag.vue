<script setup>
import {CircleClose, MoreFilled} from "@element-plus/icons-vue";
import _ from "lodash";
import {info} from "@/utils/log";
import {useRoute} from "vue-router";
import {computed, reactive, ref, watch} from "vue";
import router from "@/router";
import store from "@/store";

const route = useRoute();
let tags = reactive([]);

let props = defineProps({
  // 指定首页路由的name
  homeName: {
    type: String,
    default: "首页"
  },
  // 指定首页路由的path
  homePath: {
    type: String,
    default: "/"
  }
});

/**
 * 监听路由跳转的监听器
 */
watch(useRoute(), function (to, from) {
  for (let key in tags) {
    if (to.name === tags[key].name) {
      return;
    }
  }
  if (to.path === props.homePath) {
    return;
  }
  tags.push({
    path: to.path,
    name: to.name
  });
}, {
  deep: true
});

/**
 * tag点击事件
 * @param tag
 */
function tagClick(tag) {
  router.push({name: tag.name});
}

/**
 * tag关闭事件
 * @param index
 */
function tagClose(index) {
  if (tags[index].name === route.name) {
    if (index === 0) {
      router.push(props.homePath);
    } else {
      router.push({name: tags[index - 1].name});
    }
  }
  tags.splice(index, 1);
}

/**
 * 关闭全部tag
 */
function closeAllTag() {
  router.push(props.homePath);
  tags.length = 0;
}
</script>

<template>
  <div class="home">
    <div>
      <el-tag @click="tagClick({name: props.homeName})" :effect="useRoute().path === '/' ? 'dark' : 'light'">首页</el-tag>
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
      <el-dropdown>
        <el-icon style="cursor: pointer;font-size: 20px;"><MoreFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeAllTag"><el-icon><CircleClose /></el-icon>关闭所有标签页</el-dropdown-item>
            <el-dropdown-item>关闭其他标签页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
