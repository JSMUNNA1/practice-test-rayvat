import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product } from '../../../store/slices/productSlice';
import { cn } from '../../../lib/utils';

const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm = ({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: '',
      price: 0,
      category: '',
      stock: 0,
      rating: 0,
      description: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title')}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
              errors.title && "border-red-500"
            )}
            placeholder="Product name"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
              errors.price && "border-red-500"
            )}
            placeholder="0.00"
          />
          {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <input
            {...register('category')}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
              errors.category && "border-red-500"
            )}
            placeholder="Category"
          />
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
              errors.stock && "border-red-500"
            )}
            placeholder="0"
          />
          {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Rating (0-5)</label>
          <input
            type="number"
            step="0.1"
            {...register('rating', { valueAsNumber: true })}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
              errors.rating && "border-red-500"
            )}
            placeholder="0.0"
          />
          {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none",
            errors.description && "border-red-500"
          )}
          placeholder="Product description"
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md shadow-sm transition-all disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{initialData ? 'Update' : 'Create'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
