<script lang="ts" setup>
import '@nordhealth/components/lib/Input';
import '@nordhealth/components/lib/Checkbox';

const formData = reactive({
  email: '',
  password: '',
  receiveUpdates: false,
});

const onSubmit = () => {
  console.log('SUBMIT');
};
const onCancel = () => {
  console.log('CANCEL');
};
</script>

<template>
  <AForm @submit="onSubmit" @cancel="onCancel">
    <nord-input
      ref="emailInput"
      v-model="formData.email"
      :label="$t('email.long', 1)"
      type="email"
      name="email"
      required
      autocomplete="email"
    />

    <!-- Password Field -->
    <PasswordInput v-model="formData.password" />
    <!-- Updates Checkbox -->
    <nord-checkbox
      v-model="formData.receiveUpdates"
      id="singup-receive-updates-checkbox"
      type="checkbox"
      label="I would like to receive occasional product updates and announcements"
      name="receiveUpdates"
    />
  </AForm>
</template>
