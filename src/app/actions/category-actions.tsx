'use server'
import { createClient } from "@/utils/supabase/server";
import { Database } from "../types/database";

export async function addCategory(formData: FormData) {

    const categoryName = formData.get('categoryName')?.toString() || '';

    // Validaciones simples del lado del servidor
    if (!categoryName ) {
        throw new Error('Datos inválidos');
    }

    // Inserción en la base de datos
    const supabase = createClient()
    const { data, error } = await supabase
    .from('product_category')
    .insert([
      { category_name: categoryName },
    ])
    .select()

    if(error) {
        return {error:error.message}
    }

    return {data}
}