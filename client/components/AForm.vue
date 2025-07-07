<script setup lang="ts">
import '@nordhealth/components/lib/Stack';
import '@nordhealth/components/lib/Button';

interface AFormProps {
  focusFirstInput?: boolean;
}
const props = withDefaults(defineProps<AFormProps>(), {
  focusFirstInput: true,
});

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const formRef = ref<HTMLElement>();
const submitting = ref(false);

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
      <slot name="controls">
        <nord-stack direction="horizontal" gap="1">
          <nord-button
            type="button"
            :disabled="submitting"
            tabindex="-1"
            @click="onCancel"
          >
            {{ $t('cancel') }}
          </nord-button>
          <nord-button
            type="submit"
            variant="primary"
            :disabled="submitting"
            :loading="submitting"
          >
            {{ submitting ? `${$t('submitting')}...` : $t('submit') }}
          </nord-button>
        </nord-stack>
      </slot>
    </nord-stack>
  </form>
</template>
