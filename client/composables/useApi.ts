import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export interface Endpoint {
  url: string;
  options?: NitroFetchOptions<NitroFetchRequest>;
}

export const useApi = <ResT, DataT = ResT>() => {
  const loading = ref(false);
  const { $api } = useNuxtApp();

  const execute = async (
    url: string,
    options: NitroFetchOptions<NitroFetchRequest> = {},
    config?: {
      transform?: (data: ResT) => DataT;
      successCallback?: (response: DataT) => void;
      errorCallback?: (error: Error) => void;
      finallyCallback?: () => void;
    }
  ): Promise<DataT> => {
    loading.value = true;

    try {
      const response = await $api<ResT>(url, options);

      // Apply transformation if provided, otherwise cast to DataT
      const transformedData = config?.transform
        ? config.transform(response)
        : (response as unknown as DataT);

      config?.successCallback?.(transformedData);
      return transformedData;
    } catch (error) {
      config?.errorCallback?.(error as Error);
      throw error;
    } finally {
      config?.finallyCallback?.();
      loading.value = false;
    }
  };

  return { loading, execute };
};
