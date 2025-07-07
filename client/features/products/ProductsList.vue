<script setup lang="ts">
const product = {
  id: 1,
  name: 'Super awesome product',
  text: 'This is some super awesome product that you definetly want to sign up for! Sign-up now and get a one time, totaly free, T-Shirt',
  signedup: false,
  subscribed: false,
};
</script>
<template>
  <div class="product-list">
    <div class="card-wrapper">
      <ProductCard :item="product" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card-wrapper {
    max-width: 768px;
  }
}
</style>
