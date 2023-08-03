<script setup>
import {reactive, ref} from "vue";
import {onClickOutside} from "@vueuse/core";

const menuBox = ref();
const menuBoxStyle = reactive({display: 'none', top: '250px', left: '250px'});
onClickOutside(menuBox, () => menuBoxStyle.display = 'none');

function contextmenu(e) {
  e.preventDefault();

  let evt = window.event || arguments[0];
  let menu = menuBox.value;
  let container = document.getElementById('app');//获取区域
  /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
  let right = container.clientWidth - evt.clientX;
  let bottom = container.clientHeight - evt.clientY;
  /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
  if (right < menu.offsetWidth) {
    menuBoxStyle.left = container.scrollLeft + evt.clientX - menu.offsetWidth + "px";
  } else { /*否则，就定位菜单的左坐标为当前鼠标位置*/
    menuBoxStyle.left = container.scrollLeft + evt.clientX + "px";
  }
  /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
  if (bottom < menu.offsetHeight) {
    menuBoxStyle.top = container.scrollTop + evt.clientY - menu.offsetHeight + "px";
  } else {/*否则，就定位菜单的上坐标为当前鼠标位置*/
    menuBoxStyle.top = container.scrollTop + evt.clientY + "px";
  }

  menuBoxStyle.display = "block";
}

defineExpose({
  contextmenu
});
</script>

<template>
  <div ref="menuBox" :style="menuBoxStyle" class="popup-menu-box">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.popup-menu-box {
  display: none;
  position: absolute;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  border-radius: 4px;
  z-index: 3;
  padding: 5px 0;
}
</style>
