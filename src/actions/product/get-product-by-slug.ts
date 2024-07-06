"use server"

import prisma from "@/lib/prisma";
interface slugOptions {
  slug: string;
}

export const getProductBySlug = async ({ slug }: slugOptions) => {

  try {
    const product = await prisma.product.findFirst({
      include: { ProductImage: { select: { url: true }, } },
      where: { slug }
    });

if(!product) return null;

    return {
          ...product, images: product.ProductImage.map(image => (
            image.url
          ))
    }

  } catch (error) {
    throw new Error("no se encontro el producto")
  }
};