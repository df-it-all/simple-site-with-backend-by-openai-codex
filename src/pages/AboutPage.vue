<template>
  <section>
    <h2>關於我們</h2>
    <p>此頁面公開顯示，內容由後端 mock 取得。</p>

    <article v-if="about">
      <p>{{ about.description }}</p>
      <ul>
        <li v-for="item in about.focus" :key="item">{{ item }}</li>
      </ul>
    </article>

    <p v-else>載入中...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAbout } from '../services/api';

const about = ref(null);
const error = ref('');

const fetchAbout = async () => {
  try {
    about.value = await getAbout();
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchAbout);
</script>

<style scoped>
ul {
  padding-left: 1.25rem;
}

.error {
  margin-top: 1rem;
  color: #d7263d;
}
</style>
