<script setup>
import {ref} from "vue";
import TabPage from "@/components/CommonTabs/TabPage.vue";
import {useRoute} from "vue-router";
import PopupMenuItem from "@/components/CommonTabs/PopupMenuItem.vue";
import PopupMenu from "@/components/CommonTabs/PopupMenu.vue";

const route = useRoute();
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  // 获取当前焦点（选中）标签
  focus: {
    type: Function,
    default: () => {
    }
  }
});
const emits = defineEmits(["click", "close"]);

const homeData = {path: '/'};
const scrollbarRef = ref();
const tabsRef = ref();
const menuBoxRef = ref();
let focus = ref({});
let scrollTop = ref(0);
let scrollLeft = ref(0);

/**
 * 标签页状态变化时的回调
 * @param e
 */
function change(e) {
  // console.log("当前元素位置", e.offsetLeft, "当前滚动条位置", scrollLeft.value, "当前显示区域", tabsRef.value.clientWidth);
  if (e.offsetLeft < scrollLeft.value || e.offsetLeft > scrollLeft.value + tabsRef.value.clientWidth) {
    scrollbarRef.value.setScrollLeft(e.offsetLeft);
  }
}

/**
 * 获取当前标签页状态，并将当前焦点标签页数据保存
 * @param tabData 标签页数据
 * @return {boolean}
 */
function isFocus(tabData) {
  if (route.path === tabData.path) {
    focus.value = tabData;
    return true;
  }
  return false;
}

function scroll(s) {
  scrollTop.value = s.scrollTop;
  scrollLeft.value = s.scrollLeft;
}

let tabIndex = ref(0);

function contextmenu(index, event) {
  console.log(index, event);
  // menuBoxRef.value.contextmenu(e);
}

/**
 * 监听滚动条，将向下/向上滚动转化为向左向右滚动
 */
function ViewScroll(e) {
  if (e.wheelDelta < 0) {
    // 向下滚动
    scrollbarRef.value.setScrollLeft(scrollLeft.value + 20);
  } else {
    // 向上滚动
    scrollbarRef.value.setScrollLeft(scrollLeft.value - 20);
  }
}

defineExpose({
  getFocusData: () => focus.value
});
</script>

<template>
  <popup-menu ref="menuBoxRef">
    <popup-menu-item>关闭其他</popup-menu-item>
    <popup-menu-item>关闭全部</popup-menu-item>
    <popup-menu-item>重新加载</popup-menu-item>
  </popup-menu>

  <el-scrollbar ref="scrollbarRef" class="scrollbar" @mousewheel="ViewScroll" @scroll="scroll">
    <div ref="tabsRef" class="tabs">
      <tab-page
          :change="change"
          :checked="isFocus(homeData)"
          icon="HomeFilled"
          @click="emits('click', homeData)"
          @contextmenu="contextmenu">首页
      </tab-page>
      <tab-page
          v-for="(item, index) in data"
          :key="index"
          :change="change"
          :checked="isFocus(item)"
          :closable="true"
          :data-index="index"
          :icon="item.icon"
          @click="emits('click', item)"
          @close="emits('close', index)"
          @contextmenu="contextmenu(index)"
      >
        {{ item.label }}
      </tab-page>
    </div>
  </el-scrollbar>

</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 30px;
  display: flex;
  white-space: nowrap;
}

:deep(.el-scrollbar__bar) {
  top: 0;
  height: 5px;
}
</style>
