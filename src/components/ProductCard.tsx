"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { Card } from "./ui/card";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

type ProductCard = {
  product: Product;
  userId: string;
};
export default function ProductCard({ product, userId }: ProductCard) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favoriteState, setFavoriteState] = useState<{
    isFavorite: boolean;
    favoriteId?: string;
  }>({ isFavorite: false, favoriteId: undefined });
  const hasMutipleImages = product.images.length > 1;
  const handleMouseEnter = () => {
    if (hasMutipleImages) {
      setCurrentImageIndex(1);
    }
  };
  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(
          `/api/favorite?userId=${userId}&productId=${product.id}`
        );
        if (response.data && response.data.length > 0) {
          setFavoriteState({
            isFavorite: true,
            favoriteId: response.data[0].id,
          });
        }
      } catch (error) {
        console.log("Error checking favorite status", error);
      }
    };
    if (userId) {
      checkFavorite();
    }
  }, [userId, product.id]);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      if (favoriteState.isFavorite && favoriteState.favoriteId) {
        await axios.delete("/api/favorite", {
          data: { id: favoriteState.favoriteId },
        });
        router.refresh();
        setFavoriteState({ isFavorite: false, favoriteId: undefined });
        toast.success("Remove from favorite list!");
      } else {
        const response = await axios.post("/api/favorite", {
          productId: product.id,
          userId,
        });
        if (response.status === 200) {
          setFavoriteState({
            isFavorite: true,
            favoriteId: response.data.id,
          });
          router.refresh();
          toast.success("Add to favorite list!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail to add favorite");
    }
  };
  return (
    <div className="relative transition-transform transform hover:scale-105">
      {/* ♥ button – NOT inside the link */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-50 p-1 "
        aria-label={
          favoriteState.isFavorite
            ? "Remove from favourites"
            : "Add to favourites"
        }
      >
        {favoriteState.isFavorite ? (
          <FaHeart className="w-5 h-5 text-black hover:scale-110 transition-transform" />
        ) : (
          <FaRegHeart className="w-5 h-5 text-gray-700 hover:scale-110 transition-transform" />
        )}
      </button>
      <Link
        href={`/product/${product.id}`}
        className="block" // keeps the link a block‑level element
        prefetch // optional, auto‑prefetches on hover/in‑view
      >
        <Card
          className="p-3 space-y-4 cursor-pointer shadow-md hover:shadow-lg duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="aspect-square rounded-xl bg-gray-100 relative">
            <Image
              alt={product.name + product.id}
              src={
                product.images[currentImageIndex]?.url || product.images[0]?.url
              }
              className="object-contain transition-opacity"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div>
            <h1 className="text-sm font-semibold truncate">{product.name}</h1>
            <p className="text-xs font-semibold text-gray-400">
              {product.type === "Men"
                ? "Men's shoes"
                : product.type === "Women"
                ? "Wowen's shoes"
                : product.type === "Kids"
                ? "Kid's shoes"
                : null}
            </p>
            <p className="text-md font-bold my-2">
              {formatter.format(Number(product.price))}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}
