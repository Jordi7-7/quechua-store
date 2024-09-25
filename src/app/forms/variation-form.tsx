'use client'; // Es un Client Component

import { useState, useTransition, useRef } from 'react';
import { addVariation } from '../actions/variation-actions';
import { useRouter } from 'next/navigation';

export default function VariationForm() {
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

            const result = await addVariation(formData);

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
            <select name="categoryId">

            </select>
            <input
                className='text-black'
                type="text"
                name="variationName"
                placeholder="Nombre de la variacion"
                required
            />
            <button type="submit" disabled={isPending}>
                {isPending ? 'Agregando...' : 'Agregar Variacion'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Variacion agregada con éxito</p>}
        </form>
    );
}
