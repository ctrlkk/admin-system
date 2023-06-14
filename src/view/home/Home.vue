<script setup>

import {onMounted, ref} from "vue";
import {info} from "@/utils/log";
import * as echarts from 'echarts';
import _ from "lodash";

const echartsDemo01 = ref(null);


onMounted(() => {
  // 初始化 echartsDemo01 的统计图
  const echartsObj = echarts.init(echartsDemo01.value);
  echartsObj.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
  // 窗体改变时重绘图表
  window.onresize = _.debounce(function () {
    echartsObj.resize();
  }, 100);
});


</script>

<template>
<div class="home">
  <el-row>
    <el-col :span="8">
      <el-card>
        <div class="user">
          <el-avatar :size="100" style="cursor: pointer;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          <div class="user-info">
            <p class="user-name">Admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登入时间:<span>2022-08-27 8:56</span></p>
          <p>上次登入地点:<span>湘潭</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="statistics">
        <div ref="echartsDemo01">

        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<style scoped lang="scss">

.user {
  display: flex;
  align-items: center;
  &>.user-info {
    margin-left: 20px;
    &>.user-name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    &>.access {
      color: #B3B9BF;
    }
  }
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px #ccc solid;
}

.login-info {
  &>p {
    font-size: 14px;
    color: #999999;
    line-height: 28px;
    &>span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.statistics {
  margin-left: 20px;
  height: 288px;
  div {
    height: 250px;
  }
}
</style>
