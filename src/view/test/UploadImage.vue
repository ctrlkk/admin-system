<script setup>
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import PictureCropping from "@/components/PictureCropping/PictureCropping.vue";

const images = ref([]);
const cropper = ref();

/**
 * 上传图片
 * @param file 图片
 */
async function upload(file) {
  let base64 = await pictureToBase64(file.file);
  base64 = (await cropper.value.slice(base64)).getCroppedCanvas({
    imageSmoothingQuality: 'high'
  }).toDataURL('image/gif');
  images.value.length = images.value.length - 1;
  images.value.push({url: base64});
}

/**
 * 图片base64
 * @param file 图片文件
 * @return {Promise<unknown>}
 */
const pictureToBase64 = async (file) => {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      resolve(reader.result);
    }
  })
}
</script>

<template>
  <div>
    <!-- 图片裁剪 -->
    <picture-cropping ref="cropper" />

    <el-upload
        v-model:file-list="images"
        list-type="picture-card"
        :auto-upload="true"
        :http-request="upload"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<style scoped lang="scss">

</style>
