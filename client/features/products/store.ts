import { endpoints } from './api';
import type { Product } from './types';

export const useProductsStore = defineStore('products-store', () => {
  const products = ref<Product[]>([]);

  const loadProducts = () => {
    const { url, options } = endpoints.getProducts;
    const { loading, execute } = useApi<Product[]>();

    const getProducts = async () => {
      await execute(url, options, (response) => {
        products.value = response;
      });
    };

    return { loading, getProducts };
  };
  return { products, loadProducts };
});
