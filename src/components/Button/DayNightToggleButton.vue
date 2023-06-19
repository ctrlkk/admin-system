<script setup>
import {reactive, ref} from "vue";
let isNight = ref(false);

let props = defineProps({
  // 按钮大小 单位px
  size: {
    type: Number,
    default: 180
  }
});

// 动态计算的 长宽高等信息
let style = reactive({
  '--components-width': `${props.size}px`,
  '--components-height': '70px',
});

function click() {
  isNight.value = !isNight.value;
}
</script>

<template>
  <div :class="{ 'components': true, 'night': isNight }" :style="style">
    <!-- 太阳or月亮 -->
    <div class="main-button" @click="click">
      <!-- 月亮上的陨石坑 -->
      <div class="moon"></div>
      <div class="moon"></div>
      <div class="moon"></div>
    </div>
    <!-- 按钮底层的三个虚影 -->
    <div class="daytime-background"></div>
    <div class="daytime-background"></div>
    <div class="daytime-background"></div>
    <!-- 实体云 -->
    <div class="cloud">
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <!-- 阴影云 -->
    <div class="cloud-light">
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <!-- 星星 -->
    <div class="stars">
      <div class="star big"></div>
      <div class="star big"></div>
      <div class="star medium"></div>
      <div class="star medium"></div>
      <div class="star medium"></div>
      <div class="star small"></div>
      <div class="star small"></div>
      <div class="star small"></div>
      <div class="star small"></div>
      <div class="star small"></div>
      <div class="star small"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 黑夜模式的样式
.night {
  background-color: rgba(25,30,50,1) !important;
  .main-button {
    transform: translateX(110px) !important;
    background-color: rgb(195, 200, 210, 1) !important;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5), inset  -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset  4px 5px 2px -2px rgba(255, 255, 210,1) !important;
  }
  // 阴影
  .daytime-background {
    &:nth-child(2) {
      transform: translateX(110px) !important;
    }
    &:nth-child(3) {
      transform: translateX(80px) !important;
    }
    &:nth-child(4) {
      transform: translateX(50px) !important;
    }
  }
  // 云层和阴影
  .cloud, .cloud-light {
    transform: translateY(80px) !important;
  }
  // 陨石坑
  .moon {
    opacity: 1 !important;
  }
  // 星星
  .stars {
    transform: translateY(-62.5px) !important;
    opacity: 1;
  }
}

.components {
  position: fixed;
  width: var(--components-width);
  height: var(--components-height);
  border-radius: 100px;
  overflow: hidden;
  transition: 0.7s;
  background-color: rgba(70, 133, 192, 1);
  box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.5);

  &>* {
    transition: 0.7s;
  }

  // 主要按钮样式
  .main-button {
    margin: 7.5px 0 0 7.5px;
    width: 55px;
    height: 55px;
    background-color: rgba(255, 195, 35, 1);
    border-radius: 50%;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5), inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5), inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
    cursor: pointer;
    transition: 0.7s;
    transition-timing-function: cubic-bezier(0, 0.5, 1.3, 1);
  }

  // 陨石坑
  .moon {
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transition: 0.5s;
    opacity: 0;
    transition-timing-function: cubic-bezier(0, 0.5, 1.3, 1);
    position: absolute;
    background-color: rgba(150, 160, 180, 1);
    &:nth-child(1) {
      top: 7.5px;
      left: 25px;
      width: 12.5px;
      height: 12.5px;
    }
    &:nth-child(2) {
      top: 20px;
      left: 7.5px;
      width: 20px;
      height: 20px;
    }
    &:nth-child(3) {
      top: 32.5px;
      left: 32.5px;
      width: 12.5px;
      height: 12.5px;
    }
  }

  // 按钮背后的虚影
  .daytime-background {
    position: absolute;
    transition: 0.7s;
    border-radius: 50%;
    transition-timing-function: cubic-bezier(0, 0.5, 1.3, 1);
    &:nth-child(2) {
      top: -20px;
      left: -20px;
      width: 110px;
      height: 110px;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: -2;
    }
    &:nth-child(3) {
      top: -35px;
      left: -15px;
      width: 135px;
      height: 135px;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: -3;
    }
    &:nth-child(4) {
      top: -45px;
      left: -15px;
      width: 160px;
      height: 160px;
      background-color: rgba(255, 255, 255, 0.05);
      z-index: -4;
    }
  }

  // 云和云层虚影的动画过渡时间和非线性动画
  .cloud, .cloud-light {
    transition: 0.7s;
  }

  // 设置实体云层级
  .cloud {
    z-index: -2;
  }

  // 云层虚影在云层下方,并且整体上移,逆时针旋转5度
  .cloud-light {
    position: absolute;
    z-index: -3;
    right: 0;
    bottom: 25px;
    opacity: 0.5;
    transform: rotate(-5deg);
  }

  // 绘制云的形状
  .cloud-son {
    z-index: -1;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    &:nth-child(1), &:nth-child(7) {
      right: -20px;
      bottom: 10px;
      width: 50px;
      height: 50px;
    }
    &:nth-child(2), &:nth-child(8) {
      right: -10px;
      bottom: -25px;
      width: 60px;
      height: 60px;
    }
    &:nth-child(3), &:nth-child(9) {
      right: 20px;
      bottom: -40px;
      width: 60px;
      height: 60px;
    }
    &:nth-child(4), &:nth-child(10) {
      right: 50px;
      bottom: -35px;
      width: 60px;
      height: 60px;
    }
    &:nth-child(5), &:nth-child(11) {
      right: 75px;
      bottom: -60px;
      width: 75px;
      height: 75px;
    }
    &:nth-child(6), &:nth-child(12) {
      right: 110px;
      bottom: -50px;
      width: 60px;
      height: 60px;
    }
  }

  // 所有星星样式
  .stars {
    transform: translateY(-125px);
    z-index: -2;
    transition: 0.7s;
    transition-timing-function: cubic-bezier(0, 0.5, 1.3, 1);
    // 大星星
    .big {
      width: 15px;
      height: 15px;
    }
    // 中星星
    .medium {
      width: 10px;
      height: 10px;
    }
    // 小星星
    .small {
      width: 6px;
      height: 6px;
    }

    .star {
      background-color: #ffffff;
      clip-path: polygon(30% 0%, 54% 32%, 100% 30%, 65% 56%, 70% 100%, 42% 61%, 0% 70%, 34% 44%);
      position: absolute;

      // 设置星星位置
      &:nth-child(1) {
        top: 10px;
        left: 40px;
      }
      &:nth-child(2) {
        top: 20px;
        left: 95px;
      }
      &:nth-child(3) {
        top: 20px;
        left: 20px;
      }
      &:nth-child(4) {
        top: 35px;
        left: 50px;
      }
      &:nth-child(5) {
        top: 50px;
        left: 80px;
      }
      &:nth-child(6) {
        top: 50px;
        left: 20px;
      }
      &:nth-child(7) {
        top: 40px;
        left: 27.5px;
      }
      &:nth-child(8) {
        top: 55px;
        left: 45px;
      }
      &:nth-child(9) {
        top: 20px;
        left: 75px;
      }
      &:nth-child(10) {
        top: 32.5px;
        left: 67.5px;
      }
      &:nth-child(11) {
        top: 40px;
        left: 95px;
      }
    }
  }
}
</style>
