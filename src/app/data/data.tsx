'use server'
import { createClient } from "@/utils/supabase/server"
import { Tables } from "@/app/types/database"

export async function categorySelect() {
    const supabase = createClient()
    type categoryEntity = Tables<'product_category'>

    let { data: product_category , error }= await supabase
  .from('product_category')
  .select('*')

    // Manejo de errores
    if (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
    // Devolver las categorías obtenidas
    return product_category;
    
}