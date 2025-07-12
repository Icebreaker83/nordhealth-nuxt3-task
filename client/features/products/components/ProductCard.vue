<script setup lang="ts">
import '@nordhealth/components/lib/Card';
import '@nordhealth/components/lib/Stack';
import '@nordhealth/components/lib/Button';
import type { Product } from '../types';

const props = defineProps<{
  item: Product;
}>();

const route = useRoute();
const childRoutes = [
  `/products/signup-${props.item.id}`,
  `/products/signedup-${props.item.id}`,
];
const signupPath = `/products/signup-${props.item.id}`;

const isSignupActive = computed(() => {
  return childRoutes.includes(route.path);
});
</script>

<template>
  <nord-card padding="l">
    <h2 slot="header">{{ props.item.name }}</h2>

    <NuxtLink
      v-if="!isSignupActive"
      slot="header-end"
      :to="{ path: signupPath }"
    >
      <nord-button variant="primary">
        {{ $t('product.signup.self') }}
      </nord-button>
    </NuxtLink>

    <nord-stack direction="horizontal">
      <nord-stack gap="l">
        <p>
          {{ props.item.text }}
        </p>
        <template v-if="isSignupActive">
          <NuxtPage />
        </template>
      </nord-stack>
    </nord-stack>
  </nord-card>
</template>

<style scoped lang="scss">
.card-title-container {
  width: 100%;
  display: flex;

  .signup-btn {
    margin-left: 200px;
  }
}
.card-title {
  flex-grow: 1;
}
</style>
