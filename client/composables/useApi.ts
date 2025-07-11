import type { NitroFetchOptions } from 'nitropack';
import { useToastsStore } from '~/features/toast/store';

type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'connect'
  | 'options'
  | 'trace';

type Options = NitroFetchOptions<string, HttpMethod>;

export interface Endpoint {
  url: string;
  options: Options;
}

export const useApi = <T>() => {
  const config = useRuntimeConfig();
  const { add } = useToastsStore();
  const loading = ref(false);
  const errored = ref(false);

  const { apiBaseUrl: baseURL } = config.public;

  const api = $fetch.create({
    baseURL,
  });

  const execute = async (
    url: string,
    options: Options = {},
    successCallback?: (response: T) => void,
    errorCallback?: (error: Error) => void,
    finallyCallback?: () => void
  ) => {
    loading.value = true;
    errored.value = false;
    try {
      const response = await api<T>(url, options);
      successCallback?.(response);
      return response;
    } catch (error) {
      errored.value = true;
      const apiError = error as Error;
      errorCallback?.(apiError);
      const message = apiError.message ?? 'API Error';
      add({ variant: 'danger', message });
      throw new Error(apiError.message ?? 'API Error');
    } finally {
      finallyCallback?.();
      loading.value = false;
    }
  };
  return { loading, execute, errored };
};
