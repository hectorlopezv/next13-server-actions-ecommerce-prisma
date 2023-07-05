import AddCartToButton from "@/app/components/AddCartToButton";
import PriceTag from "@/app/components/PriceTag";

import prisma from "@/app/libs/prismadb";
import { incrementProductQuantity } from "@/app/server_actions/actions";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
type Props = {
  params: {
    id: string;
  };
};

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id: id } });
  if (!product) {
    notFound();
  }
  return product;
});
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: "Product",
    description: "Product for next13 server actions demo",
    openGraph: {
      title: "Product",
      description: "Product for next13 server actions demo",
      type: "website",
      url: "https://next13-server-actions.vercel.app/products/1",
      images: [{ url: product.imageUrl }],

      locale: "en_US",
    },
  };
}
export default async function Page({ params: { id } }: Props) {
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        priority
        className="rounded-lg"
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddCartToButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
