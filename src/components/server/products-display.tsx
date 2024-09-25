'use server'
import { Database, Tables } from "@/app/types/database"
import { createClient } from "@/utils/supabase/server";
import Image from 'next/image'
import { removeProduct } from "@/app/actions/product-actions";
import { revalidatePath } from 'next/cache';
import { DeleteInvoice } from '@/components/client/button-actions'; // Ajusta según tu estructura de carpetas
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'




export default async function ProductsDisplay() {
    const supabase = createClient()

    const productsWithCategoryQuery = supabase
    .from('product')
    .select(`
        *,
        product_category (
        category_name
        )
        `);
    
    type ProductsWithCategory = QueryData<typeof productsWithCategoryQuery>;

    const { data, error } = await productsWithCategoryQuery;
    if (error) throw error;
    const products : ProductsWithCategory = data

    console.log(products)

   

    return (
        <>
            <table className="min-w-full table-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">Id</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">Nombre</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">Descripcion</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">Imagen</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className={`border-b dark:border-gray-600 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{product.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{product.description}</td>
                            <td className="px-4 py-2">
                                <picture className="aspect-square rounded-lg overflow-hidden border block border-gray-300 dark:border-gray-600 shadow-sm h-36">
                                    <img src={product.product_image?.toString() || 'noproductimage.jpg'} alt={product.name} className="object-cover w-auto h-full aspect=[3/4]" />
                                </picture>
                            </td>
                            <td>
                                <DeleteInvoice id={product.id} category = {product.product_category.category_name} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}