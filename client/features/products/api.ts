const paths = {
  products: '/products',
} as const;

export const endpoints: Record<string, Endpoint> = {
  getProducts: {
    url: paths.products,
    options: {
      method: 'get',
    },
  },
};
