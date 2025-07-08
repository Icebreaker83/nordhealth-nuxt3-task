<script setup lang="ts">
import { useProductsStore } from './store';

const { products } = storeToRefs(useProductsStore());
const { loadProducts } = useProductsStore();
const { getProducts } = loadProducts();

await getProducts();
</script>
<template>
  <ProductCard v-for="product in products" :key="product.id" :item="product" />
</template>
