<script setup lang="ts">
import '@nordhealth/components/lib/Header';
import { useRouter } from 'vue-router';

const { t, te } = useI18n();
const router = useRouter();
const routeTitle = computed(() => {
  const { meta: routeMeta, name: routeName } = router.currentRoute.value;
  if (typeof routeMeta !== 'object' || !('title' in routeMeta))
    return routeName;
  const i18nPath = `${routeMeta.title}`;
  return te(i18nPath) ? t(i18nPath) : routeMeta.title;
});
</script>
<template>
  <nord-header>
    <h1 class="n-typescale-l">{{ routeTitle }}</h1>
  </nord-header>
</template>
