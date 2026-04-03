"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  materials: string[];
  images: string[];
}

interface ProductPlan {
  id: string;
  title: string;
  bottles: number;
  tablets: number;
  price: number;
  mrp: number;
  save: number;
  recommended?: boolean;
}

export default function RingDetail({
  params,
}: {
  params: { productId: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  // ✅ Banner Carousel
  const banners = [
    "/banners/LandingPageBanner.png",
    "/banners/LandingPageBanner1.png",
    "/banners/LandingPageBanner2.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const plans: ProductPlan[] = [
    {
      id: "15days",
      title: "15 Days",
      bottles: 1,
      tablets: 30,
      price: 999,
      mrp: 1299,
      save: 24,
    },
    {
      id: "1month",
      title: "1 Month",
      bottles: 1,
      tablets: 60,
      price: 1599,
      mrp: 2499,
      save: 37,
      recommended: true,
    },
    {
      id: "2months",
      title: "2 Months",
      bottles: 2,
      tablets: 120,
      price: 2999,
      mrp: 4998,
      save: 40,
    },
    {
      id: "4months",
      title: "4 Months",
      bottles: 4,
      tablets: 240,
      price: 4599,
      mrp: 5999,
      save: 50,
    },
  ];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(params.productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [params.productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });
  };

  const handlePlanSelect = (plan: ProductPlan) => {
    if (!product) return;

    addToCart({
      id: `${product.id}-${plan.id}`,
      name: `${product.name} - ${plan.title}`,
      price: plan.price,
      quantity: 1,
      image: product.images[0],
    });

    router.push("/checkout");
  };

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;
  if (!product) return <div>Product not found</div>;

 return (
  <div className="w-full bg-[#121721]">
    {/* ✅ Carousel */}
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`banner-${index}`}
            className="w-full flex-shrink-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Product Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-2 md:my-8 md:mx-4 bg-[#121721] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
  <div className="px-4 py-6 flex justify-center bg-white/5 backdrop-blur-md">
    <Image
      src={product.images[0]}
      alt={product.name}
      width={540}
      height={560}
      className="rounded-lg object-contain drop-shadow-[0_10px_30px_rgba(251,191,36,0.2)]"
      priority
    />
  </div>

  <div className="flex flex-col justify-center p-8">
    {/* Product Name - Lightened */}
    <h1 className="text-3xl font-bold mb-4 text-white">
      {product.name}
    </h1>
    
    {/* Description - Lightened */}
    <p className="text-gray-300 mb-6 leading-relaxed">
      {product.description}
    </p>

    {product.materials && (
      <div className="mb-6">
        <h3 className="text-xs tracking-widest font-bold text-amber-400 uppercase">
          Key Benefits
        </h3>
        <p className="text-gray-400">
          {/* Reminder: Update your product object to remove the jewelry materials! */}
          {product.materials.join(", ")}
        </p>
      </div>
    )}

    <p className="text-3xl font-bold mb-8 text-amber-500">
      ₹ {product.price.toFixed(2)}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => handlePlanSelect(plan)}
          className={`cursor-pointer border rounded-2xl p-4 transition-all relative backdrop-blur-sm group ${
            plan.recommended
              ? "border-amber-500 bg-amber-500/10 scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              : "border-white/10 bg-white/5 hover:border-white/30"
          }`}
        >
          <span className="absolute -top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            Save {plan.save}%
          </span>

          {plan.recommended && (
            <span className="absolute -top-3 right-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              Recommended
            </span>
          )}

          <h3 className="text-xl font-bold text-white">{plan.title}</h3>
          <p className="text-gray-400 text-sm">{plan.bottles} Bottle</p>
          <p className="text-gray-400 text-sm">{plan.tablets} Tablets</p>

          <p className="text-2xl font-bold mt-4 text-white">
            ₹ {plan.price}
          </p>

          <p className="text-red-400/80 line-through text-sm">
            ₹ {plan.mrp}
          </p>

          <p className="text-[10px] text-gray-500 uppercase mt-1">
            Inclusive of all taxes
          </p>
        </div>
      ))}
    </div>

    <div className="flex items-center space-x-4">
      {/* Ensure QuantitySelector also has dark mode styles */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-6 py-4 rounded-xl transition-all font-bold shadow-lg uppercase tracking-wider"
      >
        ADD TO CART
      </button>
    </div>
  </div>
</div>

    {/* Features & Includes */}
 

    {/* Sections */}
    {/* <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-8 py-20 md:px-16 bg-[#f8f9fa]">
      <div className="text-center max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
          क्या ये चुनौतियाँ आपके आत्मविश्वास को प्रभावित कर रही हैं?
        </h2>
      </div>
    </section>

    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center">
          बाज़ार में क्या हो रहा है?
        </h2>
      </div>
    </section>

    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900">
          हमारी सोच अलग है
        </h2>
      </div>
    </section> */}

<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-8 py-24 md:px-16 bg-[#121721] border-t border-white/5">
  <div className="text-center max-w-6xl mx-auto relative">
    {/* Subtle Background Glow for Intensity */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full"></div>

    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
      confidence & wellness support
    </span>

    <h2 className="text-4xl md:text-6xl font-black leading-relaxed tracking-wide text-white mb-6">
      क्या ये चुनौतियाँ आपके <span className="text-transparent bg-clip-text leading-relaxed tracking-wide bg-gradient-to-r from-amber-400 to-orange-500">आत्मविश्वास</span> को प्रभावित कर रही हैं?
    </h2>

    <p className="text-gray-400 mt-5 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
      सही सपोर्ट और सही रूटीन के साथ आप अपनी 
      <span className="text-white font-semibold">{" "} performance</span>, 
      <span className="text-white font-semibold">{" "} confidence </span> 
      और <span className="text-white font-semibold"> relationship quality</span> 
      को बेहतर बना सकते हैं।
    </p>
  </div>
</section>
   <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto">
    <div className="text-center">
      <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
        बाज़ार में <span className="text-amber-500">क्या</span> हो रहा है?
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {/* Danger Card */}
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 px-8 py-10 backdrop-blur-md transition-all hover:border-red-500/40 group">
        <h3 className="text-2xl font-bold text-red-500 mb-5 flex items-center gap-3">
          <span className="group-hover:animate-pulse">😨</span> गलत चीजें खाना
        </h3>
        <p className="text-gray-300 text-lg leading-8">
          लोग जल्दी results के लिए <span className="text-white font-semibold">unsafe</span> और <span className="text-white font-semibold">non-branded</span> products खरीद रहे हैं जो बिना proper quality checks के market में मिलते हैं।
        </p>
        <p className="text-red-400 font-bold text-xl mt-8 flex items-start gap-2">
          <span>⚠️</span> 
          <span>harmful chemicals, side effects और कोई भरोसा नहीं!</span>
        </p>
      </div>

      {/* Expense Card */}
      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 px-8 py-10 backdrop-blur-md transition-all hover:border-amber-500/40 group">
        <h3 className="text-2xl font-bold text-amber-500 mb-5 flex items-center gap-3">
          <span className="group-hover:animate-pulse">💸</span> महंगे ब्रांड्स
        </h3>
        <p className="text-gray-300 text-lg leading-8">
          Branded products safe होते हैं लेकिन इतने costly कि हर महीने <span className="text-white font-semibold">₹3,500–₹5,000</span> खर्च करना मुश्किल हो जाता है।
        </p>
        <p className="text-amber-400 font-bold text-xl mt-8">
          और असर दिखने में भी 2–3 महीने लग जाते हैं!
        </p>
      </div>
    </div>

    {/* Bottom Question Box */}
    <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center backdrop-blur-lg shadow-2xl">
      <p className="text-3xl font-bold text-white">तो क्या करें? 🤔</p>
      <p className="text-2xl font-semibold text-red-500 mt-4 italic">
        असुरक्षित products या महंगे brands?
      </p>
      <div className="mt-8 h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
    </div>
  </div>
</section>
      {/* Mission Separate Section - Grey Theme */}
     <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-10 md:px-16 overflow-hidden">
  {/* Background Decorative Element */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full -mr-48 -mt-48"></div>
  
  <div className="max-w-6xl mx-auto text-center relative">
    {/* The Heart Icon - Swapped for a glowing effect */}
    <div className="flex justify-center mb-8">
      <div className="text-5xl text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
        ♥
      </div>
    </div>

    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
      हमारी सोच <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">अलग है</span>
    </h2>

    <p className="mt-10 text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
      <span className="text-amber-500 font-extrabold uppercase tracking-tight">Power Capsule</span> सिर्फ एक product नहीं है।
    </p>

    <div className="space-y-6 mt-10">
      <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
        यह उन लाखों पुरुषों के लिए है जो <span className="text-red-500 font-bold border-b-2 border-red-500/30 pb-1">चुपचाप</span> अपनी समस्या से जूझ रहे हैं।
      </p>

      <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
        जिन्हें एक <span className="text-white font-bold">सुरक्षित, असरदार, और affordable</span> solution चाहिए।
      </p>
    </div>

    <div className="mt-16 p-8 md:p-12 rounded-[40px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
      <p className="text-3xl md:text-5xl font-black text-white leading-tight">
        हमारा मिशन है — हर पुरुष को उसका <span className="text-amber-500">भरोसा</span> और <span className="text-amber-500">confidence</span> वापस दिलाना।
      </p>
      <p className="text-2xl md:text-4xl font-bold text-gray-300 mt-6 italic">
        बिना जेब खाली किए।
      </p>
      
      {/* Decorative Line */}
      <div className="mt-10 h-1.5 w-32 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
    </div>
  </div>
</section>
  </div>
);
}