import { endpoints } from './api';
import type { Product } from './types';

export const useProductsStore = defineStore('products-store', () => {
  const products = ref<Product[]>([]);
  const errored = ref(false);

  const loadProducts = () => {
    const { url, options } = endpoints.getProducts;
    const { loading, execute } = useApi<Product[]>();

    const getProducts = async () => {
      try {
        errored.value = false;
        await execute(url, options, (response) => {
          products.value = response;
        });
      } catch {
        errored.value = true;
      }
    };

    return { loading, getProducts };
  };
  return { products, errored, loadProducts };
});
