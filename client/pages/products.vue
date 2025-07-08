<script setup lang="ts">
import '@nordhealth/components/lib/Stack';
</script>

<template>
  <div class="product-list">
    <div class="card-wrapper">
      <nord-stack gap="l">
        <Suspense>
          <ProductsList />
          <template #fallback>
            <ProductSkeleton />
          </template>
        </Suspense>
      </nord-stack>
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
    width: 100%;
    max-width: 768px;
  }
}
</style>
