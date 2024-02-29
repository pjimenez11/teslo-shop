export const revalidate = 60;

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  const subTitle: Record<string, string> = {
    men: "Ropa para hombres",
    women: "Ropa para mujeres",
    kid: "Ropa para niños",
    unisex: "Ropa para todos",
  };

  if (!Object.keys(labels).includes(gender)) {
    return notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 12;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle={subTitle[gender]}
        className="m-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
