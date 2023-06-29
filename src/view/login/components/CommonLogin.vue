<script setup>
import {ref} from "vue";
import router from "@/router";

import {user} from '@/store/user'

let {loginInfo} = user();

let loading = ref(false);

let name = "";
let password = "";

async function login() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loginInfo.time = new Date().getTime();
    loginInfo.token = "123";
    router.push('/');
  }, 1000);
}
</script>

<template>
  <div v-loading="loading">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>Login</span>
        </div>
      </template>

      <el-form
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="100px"
          status-icon>

        <el-form-item
            v-model="name"
            label="账号"
            prop="username">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
            v-model="password"
            label="密码"
            prop="passwd">
          <el-input autocomplete="off" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登入</el-button>
          <el-button>重置</el-button>
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.login-card {
  width: 500px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);

  .el-form {
    width: 100%;
    height: 100%;
  }

  .el-form-item {
    width: 90%;
    margin: auto auto 20px;
  }

  .el-input {
    width: 80%;
  }
}
</style>
