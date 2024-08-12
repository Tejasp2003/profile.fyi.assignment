import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import productData from "../data/products.json";




const ProductList: React.FC = () => {
  return (
    <div className="container mx-auto min-h-screen p-4 pt-20">
      <h1 className="
        text-4xl font-bold text-[#b4c3ff] mb-4 mt-2 text-center
      ">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
