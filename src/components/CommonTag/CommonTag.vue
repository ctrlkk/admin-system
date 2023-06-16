<script setup>
import {CircleClose, MoreFilled} from "@element-plus/icons-vue";
import _ from "lodash";
import {info} from "@/utils/log";
import {useRoute} from "vue-router";
import {computed, reactive, ref, watch} from "vue";
import router from "@/router";
import store from "@/store";

const route = useRoute();
// let tags = reactive([]);
let tags = computed(() => store.getters.getTags);

let props = defineProps({
  // 指定首页路由的name
  homeName: {
    type: String,
    default: "Home"
  },
  // 指定首页路由的path
  homePath: {
    type: String,
    default: "/"
  },
  // 首页路由label
  homeLabel: {
    type: String,
    default: "首页"
  }
});

/**
 * 监听路由跳转的监听器
 */
/*
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
});*/

/**
 * tag点击事件
 * @param tag
 */
function tagClick(tag) {
  router.push({path: tag.path});
}

/**
 * tag关闭事件
 * @param index
 */
function tagClose(index) {
  if (tags.value[index].name === route.name) {
    if (index === 0) {
      router.push(props.homePath);
    } else {
      router.push({name: tags.value[index - 1].name});
    }
  }
  store.commit("delTag", index);
}

/**
 * 关闭全部tag
 */
function closeAllTag() {
  router.push(props.homePath);
  store.commit("delTagAll");
  store.commit("addKeepAliveInclude", props.homeName);
}

// 首次加载时将首页加入缓存名单
store.commit("addKeepAliveInclude", props.homeName);
router.push(props.homePath);
</script>

<template>
  <div class="home">
    <div>
      <el-tag
          @click="tagClick({path: props.homePath})"
          :effect="useRoute().path === '/' ? 'dark' : 'light'"
      >
        {{homeLabel}}
      </el-tag>
      <el-tag
          v-for="(item, index) in tags"
          :key="index"
          closable
          :effect="route.path === item.path ? 'dark' : 'light'"
          @click="tagClick(item)"
          @close="tagClose(index)"
      >
        {{item.label}}
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
