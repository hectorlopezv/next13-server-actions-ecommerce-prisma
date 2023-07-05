import prisma from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";
type Props = {};
export const metadata = {
  title: "Add Product",
  description: "Add Product for next13 server actions demo",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function Page({}: Props) {
  return (
    <div className="">
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          className="mb-3 w-full input input-bordered"
          type="text"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          className="mb-3 w-full input input-bordered"
          type="url"
          required
          name="imageUrl"
          placeholder="image URL"
        />
        <input
          className="mb-3 w-full input input-bordered"
          type="text"
          required
          name="price"
          placeholder="Price"
        />

        <FormSubmitButton type="submit" className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
