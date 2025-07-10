<script setup lang="ts">
import '@nordhealth/components/lib/Layout';
const { locale } = useI18n();

document.documentElement.setAttribute('data-theme', 'dark');
</script>
<template>
  <nord-layout sticky>
    <AppHeader slot="header" />
    <NuxtPage :key="locale" />
    <AppToast />
  </nord-layout>
</template>
