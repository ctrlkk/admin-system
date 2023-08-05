<script setup>
import {ref} from "vue";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'

const image = ref();
let src = ref("");
let dialog = ref(false);
let cropper;

/**
 * 弹出层打开事件
 */
function open() {
  if (cropper) cropper.destroy();

  cropper = new Cropper(image.value, {
    viewMode: 1,
    dragMode: 'none',
    initialAspectRatio: 1,
    aspectRatio: 1,
    preview: '.preview',
    background: false,
    autoCropArea: 0.6,
    zoomOnWheel: false,
    zoomable: true,
  });
}

/**
 * 提交事件
 */
let submit = ref(() => {});

/**
 * 图片裁切
 * @param image 需要被裁切的图片链接或base64
 * @return {Promise<unknown>}
 */
const slice = async (image) => new Promise(resolve => {
  src.value = image;
  dialog.value = true;
  submit.value = () => {
    dialog.value = false;
    resolve(cropper);
  }
})

defineExpose({
  slice,
});
</script>

<template>
  <el-dialog @open="open" v-model="dialog" center :title="$t('图片裁剪')" width="30%">
    <template #default>
      <el-space :wrap="true">
        <img class="image" ref="image" alt="" :src="src">
        <div class="preview"></div>
      </el-space>
    </template>
    <template #footer>
      <el-button type="success" @click="submit">{{ $t('提交') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.image {
  width: 200px;
}

.preview {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-style: Dashed;
}
</style>
