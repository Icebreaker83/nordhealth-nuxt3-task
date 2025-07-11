import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();

    const getScrollPosition = (
      scrollToTop: boolean,
      scrollToHash: boolean,
      scrollToSaved: boolean
    ) => {
      if (scrollToSaved && !!savedPosition) return savedPosition;
      if (scrollToTop) return { left: 0, top: 0 };
      if (scrollToHash && to.hash)
        return {
          el: to.hash,
          left: 0,
          top: 0,
        };

      return false;
    };

    const isRouteChanged = to && from && to.path !== from.path;

    const hookToWait = 'page:finish'; // freshRouteEnter ? 'page:finish' : 'page:transition:finish'
    if (isRouteChanged) {
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce(hookToWait, async () => {
          await nextTick();
          const fromNestedTab =
            from.matched.length > 1 ? from.matched[0].path : null;
          const toNestedTab = to.matched.length > 1 ? to.matched[0].path : null;
          const isSameNestedTab =
            fromNestedTab && toNestedTab && fromNestedTab === toNestedTab;
          const position = getScrollPosition(!isSameNestedTab, true, true);
          resolve(position);
        }); // delay time matching .page-leave-active time in app.vue
      });
    }
    if (to.hash) {
      // always scroll to hash position even on same route
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce(hookToWait, async () => {
          await nextTick();
          const position = getScrollPosition(false, true, false);
          resolve(position);
        });
      });
    }
    return null;
  },
};
