import type { Toast } from '~/features/toast/types';

declare module '#app' {
  interface NuxtApp {
    $showToast: (toast: Toast) => void;
  }

  interface RuntimeNuxtHooks {
    'api:error': (error: unkown) => void | Promise<void>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $showToast: (toast: Toast) => void;
  }
}

export {};
