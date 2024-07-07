"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setInStock] = useState(0);
  const getStock = async () => {
    try {
      const res = await getStockBySlug({ slug });
      setInStock(res);
    } catch (error) {
      setInStock(0);
    }
  };

  useEffect(() => {
    getStock();
  });

  return (
    <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {stock}
    </h1>
  );
};
