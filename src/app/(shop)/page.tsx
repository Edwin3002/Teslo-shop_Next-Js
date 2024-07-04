import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
  params: {
    gender: string;
  };
}
export default async function Home({ searchParams, params }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
