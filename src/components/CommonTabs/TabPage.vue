<script setup>
import {Close} from "@element-plus/icons-vue";
import {computed, nextTick, ref, watch} from "vue";
import Icons from "@/components/CommonAside/Icons.vue";

const tabRef = ref();

const props = defineProps({
  // 是否选中
  checked: {
    type: Boolean,
    default: false
  },
  // 是否显示删除按钮
  closable: {
    type: Boolean,
    default: false
  },
  // 左侧图标
  icon: {
    type: String
  },
  // 被选中后的回调
  change: {
    type: Function,
    default: () => {
    }
  }
});

const emits = defineEmits(["close"]);
const checked = computed(() => props.checked);

watch(checked, to => {
  if (to) {
    props.change(tabRef.value);
  }
});

nextTick(() => {
  if (checked.value) {
    props.change(tabRef.value);
  }
})
</script>

<template>
  <div ref="tabRef" :class="{checked: checked}" class="tab">
    <el-text>
      <icons :icon-name="icon"/>
      <span class="slot"><slot/></span>
      <el-icon v-if="closable" class="close-btn" @click.stop="emits('close')">
        <Close/>
      </el-icon>
      <el-icon v-if="!closable" size="3"/>
    </el-text>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  user-select: none;
  padding: 5px;
  border-right: 1px var(--el-border-color) solid;

  &.checked {
    border-bottom: 2px #569eff solid;

    .close-btn {
      & > * {
        display: inline;
      }
    }
  }

  &:hover {
    background-color: rgba(140, 138, 138, 0.1);
  }

  .slot {
    padding-left: 2px;
    padding-right: 2px;
  }

  .close-btn {
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(102, 102, 102, 0.2);
    }
  }
}
</style>
