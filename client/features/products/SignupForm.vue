<script lang="ts" setup>
import '@nordhealth/components/lib/Input';
import '@nordhealth/components/lib/Checkbox';

const receiveUpdates = ref(false);

const emit = defineEmits<{
  submit: [];
}>();

const { validators, getValidationSchema } = useValidation();
const { minLength } = validators;
const validationSchema = getValidationSchema({
  email: minLength(1),
  password: minLength(1),
});
const { errors, handleSubmit } = useForm({
  validationSchema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

// mock api request
const loading = ref(false);
const onSubmit = handleSubmit(async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('submit');
  }, 2000);
});
</script>

<template>
  <AForm :loading="loading" @submit="onSubmit">
    <nord-input
      ref="emailInput"
      v-model="email"
      :label="$t('email.long', 1)"
      :error="errors.email"
      :disabled="loading"
      type="email"
      name="email"
      required
      autocomplete="email"
    />

    <PasswordInput
      v-model="password"
      :error="errors.password"
      :disabled="loading"
    />

    <nord-checkbox
      v-model="receiveUpdates"
      type="checkbox"
      :label="$t('product.subscribe')"
      name="receiveUpdates"
      :disabled="loading"
    />
  </AForm>
</template>
