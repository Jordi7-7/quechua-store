'use server'
import { createClient } from "@/utils/supabase/server";
import { Database } from "../types/database";

export async function addVariation(formData: FormData) {

    const variationName = formData.get('variationName')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';

    // Validaciones simples del lado del servidor
    if (!variationName ) {
        throw new Error('Datos inválidos');
    }

    // Inserción en la base de datos
    const supabase = createClient()
    const { data, error } = await supabase
    .from('variation')
    .insert([
      { category_id : categoryId,
        name : variationName
       },
    ])
    .select()

    if(error) {
        return {error:error.message}
    }

    return {data}
}