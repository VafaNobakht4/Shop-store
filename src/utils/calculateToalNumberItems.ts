interface ShoppingCartItem {
  quantity: number;
}

export const calculateTotalNumberItems = <T extends ShoppingCartItem>(
  shoppingCartPosts: T[]
): number =>
  shoppingCartPosts.reduce((total, item) => total + (item.quantity || 0), 0);
