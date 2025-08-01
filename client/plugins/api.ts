export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;

  const api = $fetch.create({
    baseURL,
    onResponseError(_ctx) {
      const message =
        _ctx.response._data.message || nuxtApp.$i18n.t('unexpectedError');
      // add message handling for different statuses here
      const error = createError({
        data: null,
        statusMessage: message,
        statusCode: _ctx.response.status,
      });

      // Trigger custom API error hook
      if (import.meta.client) {
        nuxtApp.hooks.callHook('api:error', error);
      }

      throw error;
    },
  });

  return {
    provide: {
      api,
    },
  };
});
