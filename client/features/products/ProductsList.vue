<script setup lang="ts">
import '@nordhealth/components/lib/Banner';
import '@nordhealth/components/lib/Button';
import { useProductsStore } from './store';

const emit = defineEmits<{
  refresh: [];
}>();

const { products } = storeToRefs(useProductsStore());
const { loadProducts } = useProductsStore();
const { getProducts, errored } = loadProducts();

await getProducts();
</script>
<template>
  <nord-banner v-if="errored" variant="danger">
    <i18n-t keypath="api.error" tag="div">
      <template #tryAgain>
        <nord-button
          type="submit"
          class="tryagain-button"
          @click="emit('refresh')"
        >
          {{ $t('tryAgain') }}
        </nord-button>
      </template>
    </i18n-t>
  </nord-banner>
  <template v-else>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :item="product"
    />
  </template>
</template>
<style scoped lang="scss">
.tryagain-button {
  --n-button-background-color: #ffffff;
  --n-button-color: #dc2626;
  --n-button-border-color: #dc2626;
}
</style>
