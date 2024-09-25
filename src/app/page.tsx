'use client'
import Logo from "@/components/logo-kwaski";
import CategoryForm from "./forms/category-form";
import ProductForm from "./forms/product-form";
import ProductsDisplay from "@/components/server/products-display";
import { Suspense } from "react";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-240">
      <Logo className="h-12 text-white" />

      <h1 className="text-9xl text-white text-center font-sans font-bold">Aqui ira el mejor dashboard del mundo</h1>

    </main>
  );
}
