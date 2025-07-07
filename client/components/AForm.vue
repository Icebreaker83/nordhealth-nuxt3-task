<script setup lang="ts">
import '@nordhealth/components/lib/Stack';
import '@nordhealth/components/lib/Button';
import '@nordhealth/components/lib/Divider';

interface AFormProps {
  focusFirstInput?: boolean;
  loading?: boolean;
}
const props = withDefaults(defineProps<AFormProps>(), {
  focusFirstInput: true,
});

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const formRef = ref<HTMLElement>();

// Focus the first focusable element
const focusFirstElement = () => {
  if (!formRef.value) return;

  const firstFocusable = findFirstFocusableElement(formRef.value);
  if (firstFocusable) {
    focusNordComponent(firstFocusable);
  }
};

onMounted(() => {
  nextTick(() => {
    props.focusFirstInput && focusFirstElement();
  });
});

const onSubmit = () => {
  if (props.loading) return;
  emit('submit');
};

const onCancel = () => {
  emit('cancel');
};
</script>
<template>
  <form ref="formRef" @submit.prevent="onSubmit">
    <nord-stack gap="l">
      <slot></slot>
      <nord-divider />
      <slot name="controls">
        <nord-stack direction="horizontal" gap="1">
          <nord-button
            type="button"
            :disabled="props.loading"
            tabindex="-1"
            @click="onCancel"
          >
            {{ $t('cancel') }}
          </nord-button>
          <nord-button
            type="submit"
            variant="primary"
            :disabled="props.loading"
            :loading="props.loading"
          >
            {{ $t('submit') }}
          </nord-button>
        </nord-stack>
      </slot>
    </nord-stack>
  </form>
</template>
