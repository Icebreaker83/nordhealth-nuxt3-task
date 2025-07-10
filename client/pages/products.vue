<script setup lang="ts">
import '@nordhealth/components/lib/Stack';

const listKey = ref(0);
const onRefresh = () => {
  listKey.value++;
};
</script>

<template>
  <div class="product-list">
    <div class="card-wrapper">
      <nord-stack gap="l">
        <Suspense :key="listKey">
          <ProductsList @refresh="onRefresh" />
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
