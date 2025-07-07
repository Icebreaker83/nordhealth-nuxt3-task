<script setup lang="ts">
import '@nordhealth/components/lib/Input';
import '@nordhealth/components/lib/Button';
import '@nordhealth/components/lib/Tooltip';

const model = defineModel<string>();

interface PasswordInputProps {
  autocomplete?: 'new-password' | 'current-password';
  error?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<PasswordInputProps>(), {
  autocomplete: 'current-password',
});

type InputType = 'text' | 'password';
const inputType = ref<InputType>('password');

const toggleType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text';
};

const iconName = computed(() => {
  return inputType.value === 'text'
    ? 'interface-edit-off'
    : 'interface-edit-on';
});
</script>
<template>
  <nord-input
    v-model="model"
    :label="$t('password.self')"
    :type="inputType"
    :autocomplete="props.autocomplete"
    :error="props.error"
    :disabled="props.disabled"
    name="password"
    required
  >
    <nord-button
      slot="end"
      type="button"
      aria-describedby="password-tooltip"
      square
      tabindex="-1"
      :disabled="props.disabled"
      @click="toggleType"
    >
      <nord-icon :name="iconName" />
    </nord-button>
  </nord-input>
  <nord-tooltip id="password-tooltip">
    {{ $t('password.showHide') }}
  </nord-tooltip>
</template>
