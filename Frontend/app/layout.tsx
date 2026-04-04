import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import Script from "next/dist/client/script";

export const metadata: Metadata = {
  title: "Kin Ultrapower",
  description: "Leading provider of premium male enhancement supplements, designed to boost performance, confidence, and overall well-being. Our scientifically formulated products are crafted to enhance vitality and support a healthier lifestyle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google Tag Manager --> */}
<Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KKHSNTVF');
            `,
          }}
        />
{/* <!-- End Google Tag Manager --> */}
      </head>
      <body>
        {/* --- 1. GTM Noscript (Must be first thing in body) --- */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KKHSNTVF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
