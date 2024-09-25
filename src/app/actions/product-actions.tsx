'use server'
import { createClient } from "@/utils/supabase/server";
import { Database, Tables } from "../types/database";
import { uplaodImage, destroyImage } from './image-actions';
import { revalidatePath } from "next/cache";


export async function addProduct(formData: FormData) {
    const categoryId = formData.get('categoryId')?.toString() || '';    
    // Ahora obtén el texto de la opción seleccionada
    const categoryName = formData.get('categoryText')?.toString() || '';
    const productName = formData.get('productName')?.toString() || '';
    const productDescription = formData.get('productDescription')?.toString() || '';
    // const productImage = formData.get('productImage')?.toString() || '';
    const productImage = formData.get('productImage') as File;

    // Validaciones simples del lado del servidor
    if (!categoryId || !productName || !productDescription || !productImage) {
        return { error: "Datos Invalidos" }
    }

    // Inserción en la base de datos
    const supabase = createClient()
    const { data: insertData, error: insertError } = await supabase
        .from('product')
        .insert([
            {
                category_id: categoryId,
                name: productName,
                description: productDescription,
                product_image: ''
            },
        ])
        .select()

    if (insertError) {
        return { error: insertError.message }
    }

    if (productImage.name == 'undefined') {
        return {insertData}
    }

    let currentProduct: Tables<'product'> = insertData[0];

    const response = await uplaodImage(productImage, categoryName, currentProduct.id)
    console.log(response)

    const { data: updateData, error: updateError } = await supabase
        .from('product')
        .update({ product_image: response?.src })
        .eq('id', currentProduct.id)
        .select()

    // console.log(updateData)
    // console.log(updateError)

    if(updateError) {
        return {error : `${insertData} Imagen no subida `}
    }

    return { updateData }
}

export async function removeProduct(id:string, category:string) {

    // Inserción en la base de datos
    const supabase = createClient()

    const { data, error } = await supabase
    .from('product')
    .delete()
    .eq('id', id)
    .select()

    destroyImage(id,category);

    revalidatePath('/productos')

}