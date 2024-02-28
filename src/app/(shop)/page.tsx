import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default async function ShopPage() {

  const productTemp = await getPaginatedProductsWithImages();

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="m-2" />
      <ProductGrid products={products} />
    </>
  );
}
