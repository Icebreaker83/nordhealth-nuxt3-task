<script setup lang="ts">
import '@nordhealth/components/lib/Divider';
import SignupForm from '~/features/products/SignupForm.vue';

const route = useRoute();
const router = useRouter();
const productId = parseInt(route.params.id as string);

// Provide the product ID so ProductCard can know which one should show the form
provide('activeSignupProductId', productId);

const onCancel = () => {
  router.push('/');
};

const onSubmit = () => {
  navigateTo({ path: `signedup-${productId}` });
};

const formRef = ref<InstanceType<typeof SignupForm>>();
onMounted(() => {
  // temp fix for nuxt 3 route scroll behavior, which scrolls to top when routing to this nested route
  nextTick(() => {
    if (!formRef.value) return;
    const { $el: formElement } = formRef.value;
    setTimeout(() => {
      window.scrollTo({
        top: formElement.offsetTop,
      });
    }, 0);
  });
});
</script>

<template>
  <nord-divider />
  <h3>{{ $t('product.signup.title') }}</h3>
  <SignupForm ref="formRef" @cancel="onCancel" @submit="onSubmit" />
</template>
