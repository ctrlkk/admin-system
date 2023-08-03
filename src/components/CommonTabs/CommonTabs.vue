<script setup>
import {MoreFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {reactive, ref, watch} from "vue";
import router from "@/router";
import Tabs from "@/components/CommonTabs/Tabs.vue";

const route = useRoute();

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
  },
  // menu数据
  data: {
    type: Array
  },
  // 路由缓存名单
  modelValue: {
    type: Array
  },
  // 大小预设
  size: {
    type: String,
    default: "default"
  }
});

let emits = defineEmits(['update:modelValue']);
const tags = reactive([]);
const tabsRef = ref();

const keepAliveInclude = reactive(new Set()); // 保持活动的页面 (缓存名单)
watch(keepAliveInclude, function () {
  emits('update:modelValue', [...keepAliveInclude]);
});

/**
 * 监听路由跳转的监听器
 */
watch(route, function (to) {
  for (let key in tags) {
    if (to.name === tags[key].name || to.path === tags[key].path) {
      return;
    }
  }
  if (to.path === props.homePath) {
    return;
  }
  let menuDate = getMenuDataToData(props.data, to.path);
  tags.push(menuDate);
  keepAliveInclude.add(menuDate.name);
}, {
  deep: true
});

/**
 * tag点击事件
 * @param tag
 */
function tabClick(tag) {
  router.push({path: tag.path});
}

/**
 * tag关闭事件
 * @param index
 */
function tabClose(index) {
  if (tags[index].name === route.name) {
    if (index === 0) {
      router.push(props.homePath);
    } else {
      router.push({path: tags[index - 1].path});
    }
  }
  // 先删除缓存
  keepAliveInclude.delete(tags[index].name);
  // 删除标签数据
  tags.splice(index, 1);
}

(async () => {
  // 首次加载时将首页加入缓存名单
  keepAliveInclude.add(props.homeName);
})();

/**
 * 关闭全部tab
 */
async function closeAllTag() {
  await router.push(props.homePath);
  tags.length = 0;
  keepAliveInclude.clear();
  keepAliveInclude.add(props.homeName);
}

/**
 * 关闭其他
 */
async function closeOther() {
  let tabData = tabsRef.value.getFocusData();
  tags.length = 0;
  keepAliveInclude.clear();
  keepAliveInclude.add(props.homeName);

  if (tabData.path !== props.homePath) {
    tags.push(tabData);
    keepAliveInclude.add(tabData.name);
  }
}

/**
 * 寻找menuData中路径匹配的数据
 * @param arr data
 * @param path 路由路径
 * @return {null} 为空则未找到
 */
function getMenuDataToData(arr, path) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    // 找到了则返回index
    if (value.path === path) {
      return value;
    }
    // 有子选项则递归
    if (value.children) {
      let data = getMenuDataToData(value.children, path);
      if (data) {
        return data;
      }
    }
  }
  return null;
}
</script>

<template>
  <div class="common-tag">
    <tabs ref="tabsRef" :data="tags" @click="tabClick" @close="tabClose"></tabs>

    <el-dropdown trigger="click">
      <el-icon style="cursor: pointer;font-size: 20px;padding-left: 10px;padding-right: 5px">
        <MoreFilled/>
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeAllTag">{{ $t('关闭所有') }}</el-dropdown-item>
          <el-dropdown-item @click="closeOther">{{ $t('关闭其他') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.common-tag {
  //border-bottom: #e1e4e7 solid;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
