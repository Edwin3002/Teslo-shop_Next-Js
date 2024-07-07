"use server"

import prisma from "@/lib/prisma";
interface slugOptions {
  slug: string;
}

export const getStockBySlug = async ({ slug }: slugOptions): Promise<number> => {

  try {
    const stock = await prisma.product.findFirst({
      where: { slug }, select: { inStock: true }
    });

    return stock?.inStock ?? 0

  } catch (error) {
    return 0;
  }
};