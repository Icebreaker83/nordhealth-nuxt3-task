<script setup lang="ts">
import '@nordhealth/components/lib/Card';
import '@nordhealth/components/lib/Stack';
import '@nordhealth/components/lib/Button';

import type { Product } from './types';

const props = defineProps<{
  item: Product;
}>();

const router = useRouter();
const route = useRoute();

// Check if this product's signup form is currently active
const isSignupActive = computed(() => {
  return route.path === `/products/signup-${props.item.id}`;
});

const onSignup = () => {
  // Navigate to the signup child route
  router.push(`/products/signup-${props.item.id}`);
};
</script>

<template>
  <nord-card padding="l">
    <h2 slot="header">{{ props.item.name }}</h2>

    <nord-button
      v-if="!isSignupActive"
      slot="header-end"
      variant="primary"
      @click="onSignup"
    >
      {{ $t('product.signup.self') }}
    </nord-button>

    <nord-stack direction="horizontal">
      <nord-stack gap="l">
        <p>
          {{ props.item.text }}
        </p>

        <!-- This will render the signup form when the route is active for this specific product -->
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
