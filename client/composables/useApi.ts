import type { NitroFetchOptions } from 'nitropack';

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
  const loading = ref(false);

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

    try {
      const response = await api<T>(url, options);
      successCallback?.(response);
      return response;
    } catch (error) {
      const apiError = error as Error;
      errorCallback?.(apiError);
      throw new Error(apiError.message ?? 'API Error');
    } finally {
      finallyCallback?.();
      loading.value = false;
    }
  };
  return { loading, execute };
};
