import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../../types";
import { toast } from "react-toastify";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string, sizeId?: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, sizeId: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.id === data.id &&
            item.sizes.some((size) => size.id === data.sizes[0].id)
        );

        if (existingItemIndex !== -1) {
          // Item with same product and size exists, update quantity instead
          const existingItem = currentItems[existingItemIndex];
          const newQuantity =
            (existingItem.quantity || 1) + (data.quantity || 1);

          // Check if new quantity exceeds stock
          if (newQuantity > existingItem.stock) {
            toast.info("Cannot add more of this item (stock limit reached).");
            return;
          }

          // Create a new array with the updated item
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };

          set({ items: updatedItems });
          toast.success("Item quantity updated in cart.");
        } else {
          // Ensure the item has a quantity property
          const newItem = {
            ...data,
            quantity: data.quantity || 1,
          };
          set({ items: [...get().items, newItem] });
          toast.success("Item added to cart.");
        }
      },
      removeItem: (id: string, sizeId?: string) => {
        // If sizeId is provided, only remove items with that specific size
        if (sizeId) {
          const currentItems = get().items;
          const updatedItems = currentItems.filter(
            (item) =>
              !(item.id === id && item.sizes.some((size) => size.id === sizeId))
          );
          set({ items: updatedItems });
        } else {
          // Otherwise remove all items with the given id
          set({ items: [...get().items.filter((item) => item.id !== id)] });
        }
        toast.success("Item removed from the cart.");
      },

      updateQuantity: (id: string, sizeId: string, quantity: number) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex(
          (item) =>
            item.id === id && item.sizes.some((size) => size.id === sizeId)
        );

        if (itemIndex === -1) return;

        const item = currentItems[itemIndex];

        // Validate quantity
        if (quantity < 1) {
          toast.info("Quantity cannot be less than 1");
          return;
        }

        if (quantity > item.stock) {
          toast.info("Cannot exceed available stock");
          return;
        }

        // Update the item's quantity
        const updatedItems = [...currentItems];
        updatedItems[itemIndex] = {
          ...item,
          quantity: quantity,
        };

        set({ items: updatedItems });
      },

      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
