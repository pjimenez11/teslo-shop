import { Pagination, ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { Category } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: {
    gender: Category;
  };
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  const subTitle: Record<Category, string> = {
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
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
    gender,
  });
  console.log(currentPage)
  console.log(totalPages)
  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle={subTitle[gender]}
        className="m-2"
      />
      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
