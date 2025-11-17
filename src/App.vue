<template>
  <div class="main-shell">
    <header class="card" style="margin-bottom: 1.5rem">
      <h1>Simple Company</h1>
      <p class="subtitle">以最簡潔的方式展示前、後台整合</p>
      <nav>
        <RouterLink :to="withContext('/')">登入</RouterLink>
        <RouterLink :to="withContext('/welcome')">歡迎頁</RouterLink>
        <RouterLink :to="withContext('/about')">關於我們</RouterLink>
      </nav>
    </header>

    <main class="card">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();
const basePath = router.options.history.base || '/';

const withContext = (path) => {
  if (basePath === '/' || basePath === '') {
    return path;
  }
  return `${basePath.replace(/\/$/, '')}${path === '/' ? '' : path}`;
};
</script>

<style scoped>
.subtitle {
  margin-top: -0.75rem;
  color: #5e5e74;
}
</style>
