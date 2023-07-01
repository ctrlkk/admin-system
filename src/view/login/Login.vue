<script setup>
import Sea from "@/view/login/Sea.vue";
import {user} from "@/store/user";
import {storeToRefs} from "pinia";
import {tab} from "@/store/tab";
import {ref} from "vue";
import {getMenuData} from "@/api/menu";
import router from "@/router";

let {loginInfo} = user();
let {menuData} = storeToRefs(tab());

let loading = ref(false);

let name = ref("admin");
let password = ref("123456");

async function login() {
  loading.value = true;
  setTimeout(async () => {

    menuData.value = (await getMenuData()).data;
    loginInfo.time = new Date().getTime();
    loginInfo.token = "123";
    await router.push('/');
    loading.value = false;

  }, 1000);
}
</script>

<template>
  <div class="home">

    <div v-loading="loading" style="z-index: 1">
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
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
              v-model="password"
              label="密码"
              prop="passwd">
            <el-input v-model="password" autocomplete="off" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">登入</el-button>
            <el-button>重置</el-button>
          </el-form-item>

        </el-form>

      </el-card>
    </div>

    <!-- 波浪 -->
    <sea></sea>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;

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
}
</style>
