"use client";

import { useEffect, useState } from "react";
import { use } from "react"
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Leaf, Zap, ShieldCheck, Award } from "lucide-react";

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
  params: Promise<{ productId: string }>;
}) {
   const { productId } = use(params);        // ← unwrap
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const allImages = [
  ...(product?.images || []), 
  '/images/static-1.png',
  '/images/static-2.png',
  '/images/static-3.png',
  '/images/static-4.png',
  '/images/static-5.png'
];

// 3. Autoplay Effect
useEffect(() => {
  let interval: string | number | NodeJS.Timeout | undefined;
  if (isAutoPlaying && allImages.length > 1) {
    interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % allImages.length);
    }, 3000); // Changes image every 3 seconds
  }
  return () => clearInterval(interval);
}, [isAutoPlaying, allImages.length]);

  // ✅ Banner Carousel
  // const banners = [
  //   "/banners/LandingPageBanner.png",
  //   "/banners/LandingPageBanner1.png",
  //   "/banners/LandingPageBanner2.png",
  // ];

  // 1. Updated data structure with your Canva text
  const banners = [
    {
      src: "/banners/LandingPageBanner.png",
      heading: "क्या आप अपने पार्टनर को संतुष्ट न कर पाने से परेशान हैं?",
      highlight: "अब और नहीं।",
      subtext: "क्या आप जानते हैं कि इस स्थिति में 50% से अधिक महिलाएं बाहरी अफेयर की तलाश शुरू कर देती हैं?"
    },
    {
      src: "/banners/LandingPageBanner1.png",
      heading: "क्या आपकी नपुंसकता का कारण आपकी शादीशुदा ज़िंदगी को खराब कर रहा है?",
      highlight: "अब आपकी उदासी खत्म करें।",
      subtext: "आप अकेले नहीं हैं, आंकड़े बताते हैं कि इसी कारण 79% शादियाँ असफल हो जाती हैं।"
    },
    {
      src: "/banners/LandingPageBanner2.png",
      heading: "क्या आपको हर रोज़ अपने पार्टनर से धोखा मिलने का डर बना रहता है?",
      highlight: "अब आपकी उदासी खत्म करें।",
      subtext: "कई पुरुष इस कारण डिप्रेशन और एंजायटी का शिकार हो जाते हैं, जिससे उनका काम और शादीशुदा जीवन पूरी तरह प्रभावित होता है।"
    }
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
      id: "30days",
      title: "30 Days",
      bottles: 1,
      tablets: 32,
      price: 755.25,
      mrp: 795,
      save: 39.75,
    },
    {
      id: "60days",
      title: "60 Days",
      bottles: 2,
      tablets: 69,
      price: 1431,
      mrp: 1590,
      save: 159,
      recommended: true,
    },
    {
      id: "90days",
      title: "90 Days",
      bottles: 3,
      tablets: 125,
      price: 1788.75,
      mrp: 2385,
      save: 596.25,
    },
  ];

  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-emerald-500" />,
      title: "100% प्राकृतिक",
      description: "शुद्ध आयुर्वेदिक जड़ी-बूटियां",
      borderColor: "border-emerald-500/20",
      bgColor: "bg-emerald-500/5"
    },
    {
      icon: <Zap className="w-10 h-10 text-amber-500" />,
      title: "तेज़ असर",
      description: "15-20 दिन में रिजल्ट",
      borderColor: "border-amber-500/20",
      bgColor: "bg-amber-500/5"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      title: "पूरी तरह सुरक्षित",
      description: "कोई side effect नहीं",
      borderColor: "border-blue-500/20",
      bgColor: "bg-blue-500/5"
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "भरोसेमंद",
      description: "10,000+ खुश ग्राहक",
      borderColor: "border-yellow-500/20",
      bgColor: "bg-yellow-500/5"
    }
  ];

const ingredients = [
  { name: "अश्वगंधा", effect: "तनाव कम करता है और नियंत्रण बढ़ाता है", description: "मानसिक stress को दूर करके performance anxiety को कम करता है।" },
  { name: "कौंच बीज", effect: "इच्छा और उत्तेजना को बढ़ाता है", description: "Natural testosterone booster है जो desire को बढ़ाता है।" },
  { name: "शिलाजीत", effect: "ऊर्जा और स्टैमिना में वृद्धि", description: "शरीर में शक्ति और लंबे समय तक एक्टिव रखता है।" },
  { name: "सफेद मुसली", effect: "शक्ति और सहनशक्ति बढ़ाता है", description: "physical strength और endurance को बेहतर बनाता है।" },
  { name: "शतावरी", effect: "लंबे समय तक performance", description: "Body endurance बढ़ाता है और premature issues में मदद करता है।" },
  { name: "विदारीकंद", effect: "यौन शक्ति में वृद्धि", description: "Male reproductive support और overall performance improve करता है।" },
  { name: "पिप्पली", effect: "तेज असर के लिए absorption", description: "बाकी ingredients को जल्दी absorb होने में मदद करता है।" },
];

  // useEffect(() => {
  //   const loadProduct = async () => {
  //     try {
  //       const data = await fetchProductById(params.productId);
  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Failed to load product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadProduct();
  // }, [params.productId]);

   useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId); // ← use productId
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]); // ← use productId as dependency

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
  <div className="relative w-full overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]">
            {/* Optimized Background Image */}
            <Image
              src={banner.src}
              alt={`Slide ${index}`}
              fill
              className="object-cover opacity-60" // Darken image slightly to make text pop
              priority={index === 0}
            />

            {/* Text Overlay - Matching your Canva Design */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="max-w-5xl space-y-4 md:space-y-10 md:pt-24">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-[2.8] tracking-wide drop-shadow-2xl">
                  {banner.heading}
                </h2>
                <div className="inline-block py-2 px-4 bg-amber-400 text-black font-black text-2xl sm:text-4xl md:text-4xl rounded-lg shadow-xl">
                  {banner.highlight}
                </div>
                <p className="text-gray-200 text-sm sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                  {banner.subtext}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all z-20"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all z-20"
      >
        ❯
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? "w-8 h-3 bg-amber-400" : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Product Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-2 md:my-8 md:mx-4 bg-[#121721] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
  {/* Left Image Gallery with Thumbnails */}
  <div className="px-4 py-8 flex flex-col items-center bg-white/5 backdrop-blur-md relative w-full">
    {/* Main Large Image */}
      <div 
        className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden mb-6 transition-opacity duration-300"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <Image
          src={allImages[activeIndex]}
          alt={`${product?.name} view ${activeIndex + 1}`}
          fill
          className="object-contain drop-shadow-[0_10px_30px_rgba(251,191,36,0.15)]"
          priority
        />
      </div>
      {/* Bottom Thumbnail Row */}
      <div className="flex gap-3 overflow-x-hidden w-full max-w-[750px] pb-4 snap-x custom-scrollbar">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => {
              // Hover works on desktop, click works on mobile
              setActiveIndex(idx);
              setIsAutoPlaying(false);
            }}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center ${
              activeIndex === idx
                ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105 opacity-100"
                : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover bg-white/5"
            />
          </button>
        ))}
      </div>
    {/* <Image
      src={product.images[0]}
      alt={product.name}
      width={540}
      height={560}
      className="rounded-lg object-contain drop-shadow-[0_10px_30px_rgba(251,191,36,0.2)]"
      priority
    /> */}
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
        हमारा मिशन है — हर पुरुष को उसका <span className="text-amber-500">भरोसा</span> और <span className="text-amber-500 leading-relaxed">confidence</span> वापस दिलाना।
      </p>
      <p className="text-2xl md:text-4xl font-bold text-gray-300 mt-6 italic">
        बिना जेब खाली किए।
      </p>
      
      {/* Decorative Line */}
      <div className="mt-10 h-1.5 w-32 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
    </div>
    
  </div>
</section>
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5 overflow-hidden">
  {/* Subtle background glow to pull everything together */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

  <div className="max-w-6xl mx-auto text-center relative z-10">
    <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase shadow-sm">
      ✨ समाधान आ गया है
    </span>

    <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
      मिलिए <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Power Capsule</span> से
    </h2>

    <p className="mt-6 text-xl md:text-2xl text-gray-400 font-medium">
      100% आयुर्वेदिक <span className="text-amber-500/50 mx-2">•</span> 
      सुरक्षित <span className="text-amber-500/50 mx-2">•</span> 
      तेज असर <span className="text-amber-500/50 mx-2">•</span> 
      किफायती कीमत
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {/* 100% Natural Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🌿</div>
        <h3 className="text-2xl font-bold text-white mb-2">100% प्राकृतिक</h3>
        <p className="text-gray-400 group-hover:text-gray-300">शुद्ध आयुर्वेदिक जड़ी-बूटियां</p>
      </div>

      {/* Fast Results Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-amber-500/40 hover:bg-amber-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">⚡</div>
        <h3 className="text-2xl font-bold text-white mb-2">तेज़ असर</h3>
        <p className="text-gray-400 group-hover:text-gray-300">15-20 दिन में रिजल्ट</p>
      </div>

      {/* Safe Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-blue-500/40 hover:bg-blue-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🛡️</div>
        <h3 className="text-2xl font-bold text-white mb-2">पूरी तरह सुरक्षित</h3>
        <p className="text-gray-400 group-hover:text-gray-300">कोई side effect नहीं</p>
      </div>

      {/* Trusted Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-yellow-500/40 hover:bg-yellow-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🏅</div>
        <h3 className="text-2xl font-bold text-white mb-2">भरोसेमंद</h3>
        <p className="text-gray-400 group-hover:text-gray-300">10,000+ खुश ग्राहक</p>
      </div>
    </div>
  </div>
</section>

      {/* 7 Powerful Ingredients Section */}
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5 overflow-hidden">
      {/* Subtle background glow for 'science'/'ancient' vibe */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm">
            🌿 प्राचीन आयुर्वेद का विज्ञान
          </span>
          <h2 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-white">
            7 शक्तिशाली जड़ी-बूटियां
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed tracking-wide">
            हर ingredient को खास तौर पर चुना गया है आपकी <span className="text-white font-semibold">परफॉर्मेंस</span> बढ़ाने के लिए
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300 relative hover:border-amber-500/30 hover:bg-white/10"
            >
              {/* Number Badge with intense glow */}
              <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
                {index + 1}
              </div>

              <h3 className="text-4xl font-extrabold text-amber-500 mb-5 tracking-tight">{item.name}</h3>
              <p className="text-2xl font-semibold text-white mb-5 leading-tight">{item.effect}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      {/* Result Highlight Separate Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-20 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto rounded-[40px] border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent px-8 py-12 text-center backdrop-blur-xl shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden">
    {/* Animated Glow behind the text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
    
    <div className="relative z-10">
      <div className="text-6xl mb-6 drop-shadow-lg">✨</div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
        परिणाम?
      </h2>
      <p className="pt-6 text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 italic">
        शरीर पूरी तरह चार्ज हो जाता है 💪
      </p>
      <p className="pt-6 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        <span className="text-white font-semibold">Timing, Stamina, Control</span> — सब कुछ naturally बढ़ता है।
      </p>
    </div>
  </div>
</section>
     {/* Mental & Relationship Confidence Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    {/* Image Container with Glow */}
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <Image
        src="/assets/BedtimeImage1.png"
        alt="Confidence and relationship improvement"
        width={600}
        height={600}
        className="relative rounded-[40px] border border-white/10 shadow-2xl object-cover w-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
      />
    </div>

    <div>
      <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
        सिर्फ शारीरिक नहीं,
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 leading-relaxed">मानसिक बदलाव भी</span>
      </h2>

      <p className="mt-8 text-2xl text-gray-400 leading-relaxed">
        जब आपकी <span className="text-white font-bold">timing</span> और <span className="text-white font-bold">performance</span> improve होती है, तो सबसे बड़ा फायदा यह होता है:
      </p>

      <div className="mt-12 space-y-6">
        {[
          ["डर खत्म", "अब बिस्तर पर जाने से पहले घबराहट नहीं होगी"],
          ["Confidence बढ़ेगा", "खुद पर पूरा भरोसा, कोई शर्म नहीं"],
          ["पार्टनर की खुशी", "आपकी performance से वो पूरी तरह संतुष्ट"],
          ["रिश्ते मजबूत", "intimacy की वजह से bond और प्यार बढ़ेगा"],
          ["असली मर्द का एहसास", "अपनी मर्दानगी पर गर्व महसूस करोगे"],
        ].map((item, index) => (
          <div key={index} className="flex gap-6 items-start p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              ✓
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{item[0]}</h3>
              <p className="text-gray-500 text-lg mt-1">{item[1]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Box */}
      <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-10 py-12 backdrop-blur-md shadow-2xl relative">
        <div className="absolute -top-6 left-10 text-6xl text-amber-500/20 font-serif">“</div>
        <p className="text-3xl font-bold text-amber-500 leading-snug italic relative z-10">
          जब performance सही हो, तो confidence automatically आ जाता है।
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Honest FAQ Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold uppercase tracking-widest shadow-sm">
        ♡ सचाई जानें
      </span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-normal">
        क्या Power Capsule से <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 leading-relaxed">साइज़ बढ़ता है?</span>
      </h2>
    </div>

    <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
      <h3 className="text-4xl md:text-5xl font-black text-red-500 text-center uppercase">
        ईमानदारी से कहें तो - नहीं।
      </h3>
      <p className="mt-8 text-xl md:text-2xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
        Power Capsule <span className="text-white font-bold">permanently</span> साइज़ नहीं बढ़ाता। और कोई भी product permanently नहीं बढ़ा सकता।
      </p>

      <div className="mt-12 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 md:p-10">
        <h4 className="text-3xl font-black text-amber-500 text-center mb-10">
          लेकिन यह ज़रूर करता है:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["⚡ Erection Quality", "Harder, fuller, और longer lasting erection"],
            ["📈 Blood Flow", "जिससे erect होने पर maximum size achieve होता है"],
            ["❤️ Firmness", "कमजोर erection की problem solve होती है"]
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-2xl font-bold text-white mb-3">{item[0]}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{item[1]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-2xl text-gray-300 font-medium">यानी असली बात यह है कि —</p>
        <p className="text-3xl md:text-5xl font-black text-amber-500 mt-4 leading-tight">
          साइज़ से ज़्यादा important है <span className="text-white underline decoration-amber-500 underline-offset-8">quality और timing!</span>
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Comparison Pricing Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest">
        🏷️ सबसे बड़ा फायदा
      </span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
        70% सस्ता, <span className="text-amber-500">Quality</span> में कोई कमी नहीं!
      </h2>
    </div>

    <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-xl font-bold text-gray-400">Feature</th>
              <th className="px-8 py-6 text-xl font-bold text-red-500">अन्य Brands</th>
              <th className="px-8 py-6 text-xl font-black text-amber-500 bg-amber-500/10">Power Capsule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["कीमत प्रति महीना", "₹3,500 - ₹5,000", "₹999 (70% OFF)"],
              ["Ingredients", "Chemical-based", "100% Ayurvedic"],
              ["असर का समय", "2-3 महीने", "15-20 दिन में"],
              ["Side Effects", "हो सकते हैं", "शून्य (None)"],
              ["Availability", "Limited stores", "पूरे भारत में"]
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 text-lg text-gray-300 font-medium">{row[0]}</td>
                <td className="px-8 py-6 text-lg text-red-400/80 font-semibold italic">{row[1]}</td>
                <td className="px-8 py-6 bg-amber-500/5">
                   <span className="text-lg font-black text-white">{row[2]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
     {/* Emotional Benefits Cards Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      ["रिश्ता मजबूत", "Physical intimacy improve होने से emotional bond भी बढ़ेगा", "❤️", "text-red-500"],
      ["Confidence Boost", "अपनी मर्दानगी पर गर्व महसूस करोगे, सीना चौड़ा होगा", "✨", "text-amber-500"],
      ["कोई शर्मिंदगी नहीं", "जल्दी निकल जाने का guilt और embarrassment हमेशा के लिए खत्म", "🏅", "text-amber-500"],
    ].map((card, index) => (
      <div 
        key={index} 
        className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-xl shadow-2xl transition-all hover:border-amber-500/30 hover:bg-white/10 flex flex-col justify-between min-h-[320px]"
      >
        <div>
          <h3 className="text-3xl font-black text-amber-500 mb-6 tracking-tight group-hover:text-white transition-colors">
            {card[0]}
          </h3>
          <p className="text-gray-400 text-xl leading-relaxed">
            {card[1]}
          </p>
        </div>
        <div className={`text-7xl mt-8 ${card[3]} filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-110`}>
          {card[2]}
        </div>
      </div>
    ))}
  </div>
</section>
     {/* Future Lifestyle Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">ज़रा सोचिए...</h2>
      <p className="mt-6 text-2xl text-gray-400">Power Capsule लेने के बाद आपकी ज़िंदगी कैसी होगी?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Visual Cards */}
      <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 transition-all hover:scale-105">
        <div className="h-72 bg-[url('/images/night-excitement.jpg')] bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-500 uppercase">रात का इंतज़ार होगा</h3>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">अब आप excited होंगे बिस्तर पर जाने के लिए, डर नहीं लगेगा</p>
        </div>
      </div>

      <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 transition-all hover:scale-105">
        <div className="h-72 bg-[url('/images/partner-happy.jpg')] bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-500 uppercase">पार्टनर की आँखों में चमक</h3>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">जब आप 20+ मिनट रुकोगे, तो देखिए उनकी खुशी</p>
        </div>
      </div>

      {/* Control Card */}
      <div className="rounded-[40px] border border-amber-500/30 bg-amber-500/10 p-10 flex flex-col justify-between shadow-2xl">
        <div>
          <h3 className="text-3xl font-black text-white leading-tight">Complete <br/><span className="text-amber-500">Control</span></h3>
          <p className="text-gray-300 text-xl mt-6 leading-relaxed">अब आप decide करेंगे कब finish करना है, automatic नहीं होगा</p>
        </div>
        <div className="text-7xl text-amber-500 mt-8 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">✅</div>
      </div>
    </div>
  </div>
</section>

    {/* Reality CTA Highlight Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-20 md:px-16">
  <div className="max-w-6xl mx-auto rounded-[40px] border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent px-8 py-20 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden">
    
    {/* Decorative Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="relative z-10">
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
        यह सिर्फ कल्पना नहीं है <span className="inline-block animate-bounce">🎯</span>
      </h2>
      
      <p className="mt-8 text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
        यह आपकी नई reality बन सकती है!
      </p>
      
      <div className="mt-8 space-y-4">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          हज़ारों पुरुष पहले ही इस बदलाव को जी रहे हैं। 
          <span className="text-white font-bold block mt-2 text-3xl uppercase tracking-wider">अब आपकी बारी है।</span>
        </p>
      </div>

      {/* Adding an extra button here to drive the CTA home */}
      <div className="mt-12">
        <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black px-12 py-5 rounded-2xl text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
          GET STARTED NOW
        </button>
      </div>
    </div>
  </div>
</section>

{/* Safety Assurance Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest">🛡️ सुरक्षा की गारंटी</span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white">100% सुरक्षित और प्राकृतिक</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        ["🌿", "पूरी तरह आयुर्वेदिक", "कोई chemical नहीं, सिर्फ प्राकृतिक जड़ी-बूटियां"],
        ["🛡️", "Side Effect मुक्त", "हजारों users - एक भी complaint नहीं"],
        ["✅", "डेली यूज़ के लिए Safe", "रोज ले सकते हैं, कोई खतरा नहीं"],
        ["🏅", "Quality Certified", "Lab tested और approved ingredients"]
      ].map((item, idx) => (
        <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item[0]}</div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item[1]}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item[2]}</p>
        </div>
      ))}
    </div>

    {/* Note Box */}
    <div className="mt-20 max-w-4xl mx-auto rounded-[40px] border border-amber-500/20 bg-gradient-to-b from-white/5 to-transparent p-12 shadow-2xl backdrop-blur-md">
      <h3 className="text-3xl font-black text-center text-white mb-10">📌 महत्वपूर्ण नोट</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">18+</span> किसी भी उम्र के लिए</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">No Habit</span> जब चाहें बंद करें</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">Sugar/BP</span> Patients के लिए Safe</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">Co-Meds</span> दूसरी दवाओं के साथ safe</p>
      </div>
    </div>
  </div>
</section>
    
     {/* Testimonials Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest shadow-sm">
        ☆ असली ग्राहकों की राय
      </span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
        10,000+ खुश ग्राहक <br/><span className="text-amber-500">क्या कहते हैं?</span>
      </h2>
      <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        यह stories हैं उन लोगों की जिन्होंने <span className="text-white font-bold">Power Capsule</span> से अपनी ज़िंदगी बदली
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          image: true,
          quote: '"पहले सिर्फ 1-2 मिनट में सब खत्म हो जाता था। अब मैं 15-20 मिनट आराम से टिक पाता हूं।"',
          name: 'राजेश कुमार',
          meta: '32 वर्ष • दिल्ली'
        },
        {
          quote: '"मैंने बहुत सारे expensive products try किए लेकिन फायदा नहीं हुआ। अब performance में कोई problem नहीं है।"',
          name: 'अमित शर्मा',
          meta: '38 वर्ष • मुंबई'
        },
        {
          quote: '"शादी के बाद पहली रात का डर था लेकिन अब confidence बढ़ गया। 100% recommend करूंगा!"',
          name: 'विक्रम सिंह',
          meta: '29 वर्ष • जयपुर'
        }
      ].map((t, index) => (
        <div key={index} className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl transition-all hover:border-amber-500/30 hover:bg-white/10">
          {t.image && (
            <div className="h-64 rounded-2xl bg-[url('/images/testimonial-user.jpg')] bg-cover bg-center mb-8 border border-white/10 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
          )}
          <div className="text-amber-400 text-2xl mb-6 tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
            ★★★★★
          </div>
          <p className="text-gray-200 text-xl leading-relaxed italic mb-8">
            {t.quote}
          </p>
          <div className="border-t border-white/10 pt-6">
            <p className="text-2xl font-black text-white uppercase tracking-tight">{t.name}</p>
            <p className="text-amber-500/80 text-lg mt-1 font-bold">{t.meta}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
     {/* Premium Footer Section */}
<footer className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0B0E14] border-t border-white/5 px-8 py-20 md:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
    {/* Brand Info */}
    <div>
      <h3 className="text-4xl font-black text-white tracking-tighter">
        POWER<span className="text-amber-500">CAPSULE</span>
      </h3>
      <p className="mt-6 text-xl text-gray-400 font-medium leading-relaxed">
        आपकी मर्दानगी का <span className="text-white">असली साथी</span>। सुरक्षित, प्राकृतिक और असरदार।
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest">Legal & Links</h4>
      <ul className="space-y-4 text-lg text-gray-400">
        <li><a href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Privacy Policy</a></li>
        <li><a href="/terms" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Terms & Conditions</a></li>
        <li><a href="/return-policy" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Return Policy</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest">संपर्क करें</h4>
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-white text-xl font-bold">
          <span className="p-3 rounded-xl bg-white/5 border border-white/10 text-amber-500">📞</span>
          +91-XXXXX-XXXXX
        </div>
        <div className="flex items-center gap-4 text-white text-xl font-bold cursor-pointer hover:text-green-400 transition-colors">
          <span className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-500">💬</span>
          WhatsApp Support
        </div>
      </div>
    </div>
  </div>

  {/* Copyright Line */}
  <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm tracking-widest uppercase">
    © 2026 Kin Ultrapower Awareness Platform. All Rights Reserved.
  </div>
</footer>
  </div>
);
}