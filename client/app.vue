<script setup lang="ts">
import '@nordhealth/components/lib/Layout';
const { locale } = useI18n();
</script>
<template>
  <nord-layout sticky>
    <AppHeader slot="header" />
    <NuxtPage :key="locale" />
  </nord-layout>
</template>
