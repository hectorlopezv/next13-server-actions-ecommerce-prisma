import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCart } from "../libs/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
type Props = {};
async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}
export default async function NavBar({}: Props) {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Server actions next13
            <Image src={"/images/logo.png"} alt="logo" height={40} width={40} />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                className="input input-bordered w-full min-w-[100px]"
                placeholder="Search query"
              />
            </div>
          </form>
          <Link href="/add-product" className="btn btn-primary">
            Add product
          </Link>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
