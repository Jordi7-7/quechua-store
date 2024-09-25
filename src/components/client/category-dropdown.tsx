'use client';
import { useState, useEffect } from 'react';
import { categorySelect } from '@/app/data/data'; // Asegúrate de ajustar la ruta
import { Tables } from '@/app/types/database';

export default function CategoryDropdown() {

    type Category = Tables<'product_category'>
    const [categories, setCategories] = useState<Category[]>([]); // Especificamos que el estado es un array de Category

    // Cargar las categorías cuando el componente se monte
    useEffect(() => {
        async function loadCategories() {
            const data = await categorySelect();    
            
            if (!data) return 

            setCategories(data);
        }

        loadCategories();
    }, []);

    return (
        <select name="categoryId" className='text-black'>
            {categories.length === 0 ? (
                <option value="">Cargando...</option>
            ) : (
                categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.category_name}
                    </option>
                ))
            )}
        </select>
    );
}