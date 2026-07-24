import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "shophub-wishlist";

const getInitialWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(getInitialWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        return prev;
      }
      return [...prev, product];
    });
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
  };

  const value = useMemo(
    () => ({ wishlistItems, addToWishlist, removeFromWishlist }),
    [wishlistItems]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
