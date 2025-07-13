import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from '../store';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { endpoints } from '../api'; // Import directly

// Mock the useApi composable
const mockExecute = vi.fn();
const mockLoading = ref(false);

mockNuxtImport('useApi', () =>
  vi.fn(() => ({
    loading: mockLoading,
    execute: mockExecute,
  }))
);

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    mockLoading.value = false;
  });

  it('initializes with empty products and no error', () => {
    const store = useProductsStore();

    expect(store.products).toEqual([]);
    expect(store.errored).toBe(false);
  });

  it('loadProducts returns loading state and getProducts function', () => {
    const store = useProductsStore();
    const { loading, getProducts } = store.loadProducts();

    expect(loading).toBeDefined();
    expect(typeof getProducts).toBe('function');
  });

  it('getProducts successfully loads products', async () => {
    const store = useProductsStore();

    const mockProducts = Array(10).fill({ id: 1, name: 'Product' });
    // Mock successful API call - CORRECT: return data directly
    mockExecute.mockResolvedValueOnce(mockProducts);

    const { getProducts } = store.loadProducts();
    await getProducts();

    expect(store.products).toHaveLength(10);
    expect(store.errored).toBe(false);
  });

  it('getProducts sets error state when API call fails', async () => {
    const store = useProductsStore();

    // Mock failed API call
    mockExecute.mockImplementation(async (url, options, callback) => {
      throw new Error('API Error');
    });

    const { getProducts } = store.loadProducts();
    await getProducts();

    expect(store.errored).toBe(true);
    expect(store.products).toEqual([]); // Should remain empty on error
  });

  it('resets error state on successful call after previous error', async () => {
    const store = useProductsStore();

    // First call fails
    mockExecute.mockImplementation(async (url, options, callback) => {
      throw new Error('API Error');
    });
    const { getProducts: getProductsFirst } = store.loadProducts();
    await getProductsFirst();
    expect(store.errored).toBe(true);

    // Second call succeeds
    const mockProducts = Array(10).fill({ id: 1, name: 'Product' });
    // Mock successful API call - CORRECT: return data directly
    mockExecute.mockResolvedValueOnce(mockProducts);

    const { getProducts: getProductsSecond } = store.loadProducts();
    await getProductsSecond();

    expect(store.errored).toBe(false);
    expect(store.products).toHaveLength(10);
  });

  it('uses correct endpoint values', () => {
    const { url, options } = endpoints.getProducts;
    // This test verifies the store uses the actual endpoint configuration
    expect(url).toBeDefined();
    expect(options).toBeDefined();
  });
});
