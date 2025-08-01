import { useToastsStore } from '~/features/toast/store';

export default defineNuxtPlugin(() => {
  const { add: showToast } = useToastsStore();

  return {
    provide: {
      showToast,
    },
  };
});
