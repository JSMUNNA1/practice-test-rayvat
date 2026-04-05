import axiosInstance from '../../../api/axiosInstance';

export const productService = {
  getProducts: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },
  addProduct: async (product: any) => {
    const response = await axiosInstance.post('/products/add', product);
    return response.data;
  },
  updateProduct: async (id: number, product: any) => {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
  },
  deleteProduct: async (id: number) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
};
