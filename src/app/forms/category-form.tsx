'use client'; // Es un Client Component

import { useState, useTransition, useRef } from 'react';
import { addCategory } from '../actions/category-actions';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const formRef = useRef<HTMLFormElement>(null); // Ref para el formulario
    const router = useRouter()

    // Este handler se enviará al servidor al ser ejecutado

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        setError('');
        setSuccess(false);

        // Llamada a la acción del servidor dentro de startTransition
        startTransition(async () => {

            const result = await addCategory(formData);

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
            className='flex flex-col'
            onSubmit={handleSubmit} ref={formRef}>
            <input
                className='text-black'
                type="text"
                name="categoryName"
                placeholder="Nombre de la categoría"
                required
            />
            <button type="submit" disabled={isPending}>
                {isPending ? 'Agregando...' : 'Agregar Categoría'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Categoria agregado con éxito</p>}
        </form>
    );
}
