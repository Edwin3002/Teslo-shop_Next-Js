"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const {updateductToCart, removeProductToCart} = useCartStore((state) => state);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>...Loading</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateductToCart(product, quantity)
              }
            />

            <button className="underline mt-3" onClick={()=>removeProductToCart(product)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
