import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const isNew =
    Date.now() - new Date(product.createAt).getTime() < 1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}
        {isNew ? <div className="badge badge-secondary">NEWS</div>:null}
        </h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} className="mt-3" />
      </div>
    </Link>
  );
}
