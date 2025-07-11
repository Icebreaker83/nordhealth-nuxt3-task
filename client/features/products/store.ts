import { endpoints } from './api';
import type { Product } from './types';

export const useProductsStore = defineStore('products-store', () => {
  const products = ref<Product[]>([]);
  const scrollY = ref(0);

  const loadProducts = () => {
    const { url, options } = endpoints.getProducts;
    const { loading, execute, errored } = useApi<Product[]>();

    const getProducts = async () => {
      await execute(url, options, (response) => {
        products.value = response;
      });
    };

    return { loading, errored, getProducts };
  };

  const setScrollY = (value: number) => {
    scrollY.value = value;
  };
  return { products, scrollY, loadProducts, setScrollY };
});
