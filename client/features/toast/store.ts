import type { Toast, UniqueToast } from './types';

export const useToastsStore = defineStore('toast-store', () => {
  const toasts = ref<UniqueToast[]>([]);

  const add = (toast: Omit<Toast, 'id'>) => {
    toasts.value.push({ id: toasts.value.length + 1, ...toast });
  };

  const remove = (toast: UniqueToast) => {
    const toastIndex = toasts.value.findIndex((item) => item.id === toast.id);
    if (toastIndex === -1) return;
    toasts.value.splice(toastIndex, 1);
  };
  return { toasts, add, remove };
});
