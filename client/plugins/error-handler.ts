import { useToastsStore } from '~/features/toast/store';

const getErrorMessage = (error: unknown): string => {
  const { $i18n } = useNuxtApp();
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return $i18n.t('unexpectedError');
};

export default defineNuxtPlugin((nuxtApp) => {
  const { add } = useToastsStore();

  nuxtApp.hook('vue:error', (error) => {
    console.error(error);
    const message = getErrorMessage(error);
    add({
      variant: 'danger',
      message,
    });
  });

  // Handle API errors with a custom hook
  nuxtApp.hook('api:error', (error) => {
    console.error('API error:', error);
    const message = getErrorMessage(error);
    add({
      variant: 'danger',
      message,
    });
  });
});
