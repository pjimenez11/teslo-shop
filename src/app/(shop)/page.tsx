export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 12;
  ;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
  });

  if (products.length === 0) {
    redirect("/");
  }
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="m-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
