import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

export const metadata: Metadata = {
  title: "Jewelry Store",
  description: "Luxury handcrafted jewelry collections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />

        <ProductProvider>
          <CartProvider>
            <header className="flex relative top-0 bg-[#191919] z-[20] w-full gap-4 px-4 md:pt-[1rem] p-2 border-b border-gray-100 border-opacity-10">
              <Navbar />
            </header>
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
