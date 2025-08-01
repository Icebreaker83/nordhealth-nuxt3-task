<script setup lang="ts">
import '@nordhealth/components/lib/Skeleton';
import '@nordhealth/components/lib/Card';
import '@nordhealth/components/lib/VisuallyHidden';
</script>

<template>
  <nord-card padding="l" aria-busy="true">
    <nord-skeleton effect="sheen" class="skeleton-header" slot="header" />
    <div class="skeleton-paragraph">
      <nord-skeleton effect="sheen" />
      <nord-skeleton effect="sheen" />
      <nord-skeleton effect="sheen" />
      <nord-skeleton effect="sheen" />
      <nord-skeleton effect="sheen" />
    </div>
    <nord-visually-hidden>Loading</nord-visually-hidden>
  </nord-card>
</template>
<style scoped>
.skeleton-header {
  width: 30%;
}
.skeleton-paragraph nord-skeleton {
  margin-block-end: var(--n-space-m);
  width: 90%;
}
.skeleton-paragraph nord-skeleton:nth-child(2) {
  width: 75%;
}
.skeleton-paragraph nord-skeleton:nth-child(4) {
  width: 70%;
}
.skeleton-paragraph nord-skeleton:last-child {
  width: 30%;
  margin-block-end: 0;
}
</style>
