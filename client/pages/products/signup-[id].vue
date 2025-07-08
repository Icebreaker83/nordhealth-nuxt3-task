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

const onSubmit = (formData: any) => {
  console.log('Form submitted for product:', productId, formData);
  // router.push('/products');
};
</script>

<template>
  <h3>{{ $t('product.signup.title') }}</h3>
  <nord-divider />
  <SignupForm @cancel="onCancel" @submit="onSubmit" />
</template>
