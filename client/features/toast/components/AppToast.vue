<script setup lang="ts">
import '@nordhealth/components/lib/ToastGroup';
import '@nordhealth/components/lib/Toast';
import { useToastsStore } from '../store';

const { toasts } = storeToRefs(useToastsStore());
const { remove } = useToastsStore();
</script>
<template>
  <nord-toast-group>
    <nord-toast
      v-for="toast in toasts"
      :key="toast.id"
      :variant="toast.variant"
      :auto-dismiss="toast.autoDismiss"
      @dismiss="remove(toast)"
    >
      {{ toast.message }}
    </nord-toast>
  </nord-toast-group>
</template>
