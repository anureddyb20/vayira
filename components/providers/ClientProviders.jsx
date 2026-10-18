"use client";

import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import CartDrawer from "@/components/layout/CartDrawer";
import AuthModal from "@/components/layout/AuthModal";

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  );
}
