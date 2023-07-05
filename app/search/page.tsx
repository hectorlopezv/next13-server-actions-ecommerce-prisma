import prisma from "@/app/libs/prismadb";
import { notFound } from "next/navigation";
import ProductCard from "../components/ProductCard";
type Props = {
  searchParams: { query: string };
};
export function generateMetadata({ searchParams: { query } }: Props) {
  return {
    title: `Search results for "${query}"`,
    description: `Search results for "${query}"`,
  };
}
export default async function SearchPage({
  searchParams: { query = "" },
}: Props) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: query, mode: "insensitive" },
        },
        {
          description: { contains: query, mode: "insensitive" },
        },
      ],
    },
    orderBy: { id: "desc" },
  });
  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
