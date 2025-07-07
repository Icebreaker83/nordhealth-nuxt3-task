<script setup lang="ts">
import '@nordhealth/components/lib/Layout';
</script>
<template>
  <!-- <NuxtLayout
    :style="{
      ['--color-theme']: isDark ? 'var(--color-darker)' : 'var(--color-white)',
      ...appThemeVar,
    }"
  > -->
  <nord-layout>
    <NuxtPage />
  </nord-layout>

  <!-- <NuxtLayout>
    <NuxtLoadingIndicator color="#1e88e5" font="500" />
    <NuxtPage />
  </NuxtLayout> -->
</template>
