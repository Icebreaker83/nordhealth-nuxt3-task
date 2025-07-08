<script setup lang="ts">
import '@nordhealth/components/lib/Divider';

const route = useRoute();
const router = useRouter();
const productId = parseInt(route.params.id as string);

// Provide the product ID so ProductCard can know which one should show the form
provide('activeSignupProductId', productId);

const onCancel = () => {
  router.push('/');
};

const onSubmit = () => {
  navigateTo({ path: `/products/signedup-${productId}` });
};
</script>

<template>
  <nord-divider />
  <h3>{{ $t('product.signup.title') }}</h3>
  <SignupForm @cancel="onCancel" @submit="onSubmit" />
</template>
