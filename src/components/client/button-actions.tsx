import { removeProduct } from '@/app/actions/product-actions';
import { useState } from 'react';

export function DeleteInvoice({ id, category }: { id: string, category: string }) {
    const removeProductWithId = removeProduct.bind(null, id, category);

    return (
        <form action={removeProductWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
            </button>
        </form>
    );
}
