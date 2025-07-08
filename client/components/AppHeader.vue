<script setup lang="ts">
import '@nordhealth/components/lib/Header';
import '@nordhealth/components/lib/Select';

const { locale, locales, setLocale } = useI18n();
const language = ref(locale);
</script>
<template>
  <nord-header>
    <h1 class="n-typescale-l">{{ $t('app.title') }}</h1>
    <div slot="end">
      <nord-select
        v-model="language"
        name="page-size"
        hide-label
        @update:model-value="setLocale"
      >
        <option v-for="item in locales" :key="item.code" :value="item.code">
          {{ item.name }}
        </option>
      </nord-select>
    </div>
  </nord-header>
</template>
