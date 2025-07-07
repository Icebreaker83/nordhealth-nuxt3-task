<script setup lang="ts">
import '@nordhealth/components/lib/Card';
import '@nordhealth/components/lib/Stack';
import '@nordhealth/components/lib/Button';
import type { Product } from './types';

const props = defineProps<{
  item: Product;
}>();

const signingup = ref(false);

const onSignup = () => {
  signingup.value = true;
};

const onCancel = () => {
  signingup.value = false;
};
</script>
<template>
  <nord-card padding="l">
    <h2 slot="header">{{ props.item.name }}</h2>

    <nord-button slot="header-end" variant="primary" @click="onSignup">
      {{ $t('product.signup') }}
    </nord-button>
    <nord-stack direction="horizontal">
      <nord-stack gap="l">
        <p>
          {{ props.item.text }}
        </p>
        <template v-if="signingup">
          <SignupForm @cancel="onCancel" />
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
