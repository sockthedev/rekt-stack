import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { api } from "~/server/trpc.server";

export async function loader(args: LoaderArgs) {
  return json(
    {
      products: await api.product.list.query(),
    },
    {
      headers: {
        "Cache-Control": "max-age=3600",
      },
    }
  );
}

export default function ProductsRoute() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              to={`/product/${product.productId}`}
              key={product.productId}
              className="group"
            >
              <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                $ {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
