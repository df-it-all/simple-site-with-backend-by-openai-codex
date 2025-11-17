<template>
  <section>
    <h2>登入系統</h2>
    <p>使用任意帳號密碼，後端會回傳模擬 token。</p>

    <form @submit.prevent="handleLogin">
      <label for="username">帳號</label>
      <input id="username" v-model="credentials.username" required placeholder="your.name" />

      <label for="password">密碼</label>
      <input id="password" type="password" v-model="credentials.password" required placeholder="••••••" />

      <button class="button" type="submit" :disabled="pending">
        {{ pending ? '登入中...' : '登入' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="token" class="success">已取得 token，可切換到歡迎頁。</p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api';

const router = useRouter();
const credentials = reactive({ username: '', password: '' });
const pending = ref(false);
const error = ref('');
const token = ref(window.localStorage.getItem('authToken'));

const handleLogin = async () => {
  error.value = '';
  pending.value = true;
  try {
    const result = await login(credentials);
    token.value = result.token;
    window.localStorage.setItem('authToken', result.token);
    router.push({ name: 'welcome' });
  } catch (err) {
    error.value = err.message;
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped>
label {
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.error {
  margin-top: 1rem;
  color: #d7263d;
}

.success {
  margin-top: 1rem;
  color: #249b63;
}
</style>
