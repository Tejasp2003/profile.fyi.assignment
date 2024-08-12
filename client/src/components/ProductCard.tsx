import React, { useState } from "react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const {user} = useAuth();
  

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Login to add Products to the Cart ⚠️")
      return;
    }
    
    addToCart(product);
    toast.success("Item added to Cart successfully 🎉");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 700); 
  };

  return (
    <div className="relative rounded-xl p-4 flex flex-col grainy text-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-slate-600">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 object-cover mb-4  rounded-xl"
      />
      <h2 className="text-lg font-semibold text-[#141E46]">{product.name}</h2>
      <p className="text-lg font-semibold text-[#141E46] my-2">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-[#141E46] mb-2 text-sm tracking-wider italic font-medium">
        {product.description}
      </p>

     

      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`relative mt-auto bg-[#9DB2BF] px-4 py-2 rounded text-white hover:bg-[#141E46] transition-colors duration-300 ease-in-out
            ${isAdded ? "cursor-not-allowed bg-green-400 hover:bg-green-400 !text-[#141E46] font-bold" : "cursor-pointer"}
          `}
      >
        {isAdded ? "Added to Cart Successfully ✅"  : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
