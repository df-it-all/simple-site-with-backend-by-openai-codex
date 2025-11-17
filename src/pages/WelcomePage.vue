<template>
  <section>
    <header>
      <h2>歡迎回來，{{ profile?.displayName ?? '訪客' }}</h2>
      <p>這裡展示一個需要授權才能進入的頁面。</p>
    </header>

    <article v-if="profile">
      <p>你的角色：<strong>{{ profile.role }}</strong></p>
      <p>登入時間：<strong>{{ profile.loggedInAt }}</strong></p>
    </article>

    <footer class="actions">
      <button class="button" @click="refresh" :disabled="loading">
        {{ loading ? '同步中...' : '重新讀取資料' }}
      </button>
      <button class="button ghost" @click="logout">登出</button>
    </footer>

    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getProfile } from '../services/api';

const router = useRouter();
const profile = ref(null);
const error = ref('');
const loading = ref(false);

const fetchProfile = async () => {
  loading.value = true;
  error.value = '';
  const token = window.localStorage.getItem('authToken');
  if (!token) {
    router.push({ name: 'login' });
    return;
  }
  try {
    profile.value = await getProfile(token);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const refresh = () => fetchProfile();

const logout = () => {
  window.localStorage.removeItem('authToken');
  router.push({ name: 'login' });
};

onMounted(fetchProfile);
</script>

<style scoped>
.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.button.ghost {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.error {
  margin-top: 1rem;
  color: #d7263d;
}
</style>
