import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "../../../../seed/seed";
import { Category } from "@/interfaces";

interface Props {
  params: {
    id: Category;
  };
}

const products = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  const subTitle : Record<Category, string> = {
    men: "Ropa para hombres",
    women: "Ropa para mujeres",
    kid: "Ropa para niños",
    unisex: "Ropa para todos",
  };

  if (!Object.keys(labels).includes(id)) {
    return notFound();
  }

  const filteredProducts = products.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subtitle={subTitle[id]}
        className="m-2"
      />
      <ProductGrid products={filteredProducts} />
    </>
  );
}
