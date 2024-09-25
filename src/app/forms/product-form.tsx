'use client'; // Es un Client Component

import { useState, useTransition, useRef } from 'react';
import { addProduct } from '../actions/product-actions';
import { useRouter } from 'next/navigation';
import CategoryDropdown from '@/components/client/category-dropdown';

export default function ProductForm() {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const formRef = useRef<HTMLFormElement>(null); // Ref para el formulario
    const router = useRouter()

    // Este handler se enviará al servidor al ser ejecutado

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement; // Decimos que event.target es un formulario
        const formData = new FormData(e.target as HTMLFormElement);


        // Obtenemos el texto de la opción seleccionada
        const selectElement = formElement.querySelector('select[name="categoryId"]') as HTMLSelectElement;
        const selectedText = selectElement.options[selectElement.selectedIndex].text;

        // Agregamos el texto al FormData
        formData.append('categoryText', selectedText);

        setError('');
        setSuccess(false);

        // Llamada a la acción del servidor dentro de startTransition
        startTransition(async () => {

            const result = await addProduct(formData);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                router.refresh()
                formRef.current?.reset()
            }
        }
        );
    };

    return (
        <form
            className='flex flex-col gap-3'
            onSubmit={handleSubmit}
            ref={formRef}>
            <CategoryDropdown />
            <input
                className='text-black'
                type="text"
                name="productName"
                placeholder="Nombre del producto"
                required
            />
            <textarea name="productDescription" rows={4} cols={50} placeholder="Escribe la descripción aquí..."></textarea>

            <input name='productImage' type="file" accept="image/png, image/jpeg, image/jpg" />
            <button type="submit" disabled={isPending}>
                {isPending ? 'Agregando...' : 'Agregar Producto'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Producto agregado con éxito</p>}
        </form>
    );
}
