// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Footer from "@/components/Footer";
// import PageHeader from "@/components/PageHeader";
// import BackButton from "@/Reusable/BackButton";
// import ShopButton from "@/Reusable/ShopButton";
// import Image from "next/image";
// import Link from "next/link";
// import { fetchProducts } from "@/lib/api";
// import CategoryCard from "@/components/CategoryCard";

// interface Product {
//   id: string;
//   _id?: string;
//   name: string;
//   price: number;
//   description: string;
//   tagline?: string;
//   images: string[]; // Changed back to string[] since your API returns strings
//   category: string;
//   features?: string;
//   includes?: { quantity: number; item: string }[];
//   materials?: string[];
// }

// export default function RingsCollection() {
//   const [featuredRings, setFeaturedRings] = useState<Product[]>([]);
//   const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // These are the product IDs you want to feature
//   const FEATURED_PRODUCT_IDS = useMemo(
//     () => ["diamond-ring", "feature-gold-band", "feature-stackable"],
//     []
//   );

//   // Category showcase product IDs (using the 'id' field)
//   const CATEGORY_PRODUCT_IDS = useMemo(
//     () => [
//       "gold-ring", // rings
//       "category-necklaces", // necklaces
//       "about-craftsman", // earrings
//     ],
//     []
//   );

//   const FEATURE_PRODUCT_ID = useMemo(() => ["handcrafted-rings"], []);
//   useEffect(() => {
//     let isMounted = true; // Track mounted state

//     const loadProducts = async () => {
//       try {
//         const [rings, necklaces, earrings] = await Promise.all([
//           fetchProducts("rings"),
//           fetchProducts("necklaces"),
//           fetchProducts("earrings"),
//         ]);

//         // Only proceed if component is still mounted
//         if (!isMounted) return;

//         const allProducts = [...rings, ...necklaces, ...earrings];

//         if (isMounted) {
//           setFeaturedRings(
//             allProducts.filter((product) =>
//               FEATURED_PRODUCT_IDS.includes(product.id)
//             )
//           );

//           setCategoryProducts(
//             allProducts.filter((product) =>
//               CATEGORY_PRODUCT_IDS.includes(product.id)
//             )
//           );

//           setFeaturedProducts(
//             allProducts.filter((product) =>
//               FEATURE_PRODUCT_ID.includes(product.id)
//             )
//           );
//         }
//       } catch (error) {
//         if (isMounted) {
//           console.error("Failed to load products:", error);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProducts();

//     // Cleanup function
//     return () => {
//       isMounted = false;
//     };
//   }, [FEATURED_PRODUCT_IDS, CATEGORY_PRODUCT_IDS, FEATURE_PRODUCT_ID]);

//   if (loading) return <div className="text-center py-20">Loading rings...</div>;

//   return (
//     <>
//       <PageHeader title="Rings Collection" />
//       <a className="flex pl-4 md:pl-[3.6rem]">
//         <BackButton />
//       </a>

//       {/* Featured Rings Sections */}
//       {featuredRings.map((ring, index) => (
//         <div
//           key={ring.id}
//           className={`flex flex-col ${
//             index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
//           } justify-center items-center px-16 py-4 gap-8 md:gap-12 bg-white`}
//         >
//           {ring.images[0] && (
//             <Image
//               src={ring.images[0]}
//               alt={ring.name}
//               width={450}
//               height={450}
//               className="rounded-lg"
//               priority
//             />
//           )}

//           <div className="flex flex-col w-full justify-center items-center p-6">
//             {/* TAGLINE (if exists) */}
//             {ring.tagline && (
//               <h1 className="text-amber-600 text-lg font-bold tracking-widest mb-2 text-center">
//                 {ring.tagline}
//               </h1>
//             )}

//             {/* NAME */}
//             <h2 className="text-3xl text-black font-bold mb-4 text-center">
//               {ring.name}
//             </h2>

//             {/* DESCRIPTION */}
//             <p className="text-gray-700 text-base mb-6 max-w-md text-center">
//               {ring.description}
//             </p>

//             {/* SHOP BUTTON */}
//             <Link href={`/rings/${ring.id}`}>
//               <ShopButton />
//             </Link>
//           </div>
//         </div>
//       ))}

//       {/* Rest of your component remains the same */}
//       {/* ... */}
//       {/* Category Grid */}
//       <section className="px-16 pt-8 pb-8">
//         <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 mt-8 md:mt-0">
//           Browse Our Collections
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 pt-16 pb-12">
//           {categoryProducts.map((product) => (
//             <CategoryCard
//               key={product.id}
//               title={product.category.toUpperCase()}
//               href={`/${product.category}`}
//               imageSrc={product.images[0]}
//             />
//           ))}
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-8 w-full">
//         <div className="flex flex-col-reverse md:flex-row gap-4 pb-4">
//           <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-4 md:gap-8 pr-8">
//             <h2 className="text-3xl md:text-5xl font-bold">
//               HANDCRAFTED <span className="text-amber-600">RINGS</span>
//             </h2>
//             <p className="text-sm font-normal opacity-55 tracking-widest">
//               Our rings are crafted by master jewelers using only the finest
//               materials. Each piece is designed to last a lifetime and comes
//               with our comprehensive warranty. We offer free resizing within the
//               first year of purchase.
//             </p>
//           </div>
//           <div className="lg:block max-w-[39rem]">
//             {featuredProducts.map((product) => (
//               <Image
//                 key={product.id}
//                 src={product.images[0]}
//                 alt={product.name}
//                 width={1000}
//                 height={1000}
//                 className="rounded-lg"
//                 title={product.category.toUpperCase()}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import BackButton from "@/Reusable/BackButton";
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

export default function RingDetail({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  // ✅ Banner Carousel
  const banners = [
    "/banners/LandingPageBanner.jpeg",
    "/banners/LandingPageBanner1.jpeg",
    "/banners/LandingPageBanner2.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const plans: ProductPlan[] = [
    { id: "15days", title: "15 Days", bottles: 1, tablets: 30, price: 999, mrp: 1299, save: 24 },
    { id: "1month", title: "1 Month", bottles: 1, tablets: 60, price: 1599, mrp: 2499, save: 37, recommended: true },
    { id: "2months", title: "2 Months", bottles: 2, tablets: 120, price: 2999, mrp: 4998, save: 40 },
    { id: "4months", title: "4 Months", bottles: 4, tablets: 240, price: 4599, mrp: 5999, save: 50 },
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
      quantity,
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

  if (loading) return <div className="text-center py-20 text-gray-900">Loading product...</div>;
  if (!product) return <div className="text-gray-900">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900">
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
      <div className="container mx-auto px-4 py-8">
        {/* <div className="flex md:pl-[5.6rem]"><BackButton /></div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-2 md:ml-24">
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-2xl">
            <Image src={product.images[0]} alt={product.name} width={540} height={560} className="rounded-lg object-contain" priority />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {product.materials && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-amber-300">MATERIALS</h3>
                <p className="text-gray-600">{product.materials.join(", ")}</p>
              </div>
            )}

            <p className="text-2xl font-bold mb-8 text-amber-600">₹ {product.price.toFixed(2)}</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`cursor-pointer border rounded-2xl p-4 shadow-xl hover:scale-105 transition-all relative bg-white/10 backdrop-blur-sm ${plan.recommended ? "border-amber-300" : "border-gray-200"}`}
                >
                  <span className="absolute -top-3 left-3 bg-red-500 text-gray-900 text-xs px-2 py-1 rounded-full">Save {plan.save}%</span>
                  {plan.recommended && (
                    <span className="absolute -top-3 right-3 bg-amber-500 text-black text-xs px-2 py-1 rounded-full">Recommended</span>
                  )}
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <p className="text-gray-600">{plan.bottles} Bottle</p>
                  <p className="text-gray-600">{plan.tablets} Tablets</p>
                  <p className="text-3xl font-bold mt-4 text-gray-900">₹ {plan.price}</p>
                  <p className="text-red-400 line-through">₹ {plan.mrp}</p>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 text-gray-900 px-6 py-3 rounded-xl transition-all font-semibold shadow-lg"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-32 md:ml-24 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-amber-300">FEATURES</h2>
            <p className="text-gray-600 whitespace-pre-line">{product.features}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-amber-300">INCLUDES</h2>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex">
                  <span className="text-amber-600 font-bold w-8">{item.quantity}x</span>
                  <span className="text-gray-600">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>

      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-24 bg-[#f8f9fa] px-8 py-20 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              क्या आप भी इन समस्याओं से परेशान हैं?
            </h2>
            <p className="mt-5 text-2xl text-gray-600">
              हर रात यही डर... हर बार वही शर्मिंदगी...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              "बिस्तर पर सिर्फ 1-2 मिनट में सब खत्म",
              "पार्टनर के सामने शर्मिंदगी और guilt",
              "हर बार डर लगना कि 'फिर से जल्दी हो गया'",
              "Relationship में दूरियां बढ़ना",
              "Confidence की कमी - खुद पर भरोसा न रहना",
              "मर्दानगी पर सवाल उठना",
            ].map((item, index) => (
              <div key={index} className="rounded-2xl border border-amber-200 bg-white px-6 py-6 shadow-sm">
                <p className="text-xl text-gray-700 font-medium">❌ {item}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] p-10 text-center shadow-sm">
            <p className="text-2xl text-gray-700 leading-10">
              आप अकेले नहीं हैं। लाखों पुरुष इसी समस्या से जूझ रहे हैं।<br />
              <span className="text-red-500 font-semibold">लेकिन ज़्यादातर लोग चुप रहते हैं...</span> शर्म की वजह से।<br />
              <span className="text-amber-600 font-bold">और समस्या बढ़ती जाती है।</span>
            </p>
          </div>
        </div>
      </section>

      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">बाज़ार में क्या हो रहा है?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-red-600 mb-5">😨 गलत चीजें खाना</h3>
              <p className="text-gray-700 text-lg leading-8">लोग जल्दी results के लिए unsafe और non-branded products खरीद रहे हैं जो बिना proper quality checks के market में मिलते हैं।</p>
              <p className="text-red-500 font-semibold text-xl mt-6">⚠️ harmful chemicals, side effects और कोई भरोसा नहीं!</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-amber-600 mb-5">💸 महंगे ब्रांड्स</h3>
              <p className="text-gray-700 text-lg leading-8">branded products safe होते हैं लेकिन इतने costly कि हर महीने ₹3,500–₹5,000 खर्च करना मुश्किल हो जाता है।</p>
              <p className="text-amber-600 font-semibold text-xl mt-6">और असर दिखने में भी 2–3 महीने लग जाते हैं!</p>
            </div>
          </div>
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-amber-200 bg-[#fffdf8] px-10 py-10 text-center shadow-sm">
            <p className="text-3xl font-bold text-gray-900">तो क्या करें? 🤔</p>
            <p className="text-2xl font-semibold text-red-600 mt-4">असुरक्षित products या महंगे brands?</p>
          </div>
        </div>
      </section>
      {/* Mission Separate Section - Grey Theme */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="absolute left-0 top-0 text-6xl text-amber-500 opacity-80">♡</div>

          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            हमारी सोच अलग है
          </h2>

          <p className="mt-10 text-2xl md:text-3xl text-gray-700 leading-relaxed">
            <span className="text-amber-600 font-bold">Power Capsule</span> सिर्फ एक product नहीं है।
          </p>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 leading-10 max-w-4xl mx-auto">
            यह उन लाखों पुरुषों के लिए है जो <span className="text-red-500 font-semibold">चुपचाप</span> अपनी समस्या से जूझ रहे हैं।
          </p>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 leading-10 max-w-4xl mx-auto">
            जिन्हें एक <span className="text-amber-600 font-bold">सुरक्षित, असरदार, और affordable</span> solution चाहिए।
          </p>

          <div className="mt-12">
            <p className="text-3xl md:text-4xl font-bold text-amber-600 leading-relaxed">
              हमारा मिशन है - हर पुरुष को उसका भरोसा और confidence वापस दिलाना।
            </p>
            <p className="text-3xl md:text-4xl font-bold text-amber-600 mt-3">
              बिना जेब खाली किए।
            </p>
          </div>
        </div>
      </section>
      {/* Benefits Highlight Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-[#fffdf8] border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
            ✨ समाधान आ गया है
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            मिलिए <span className="text-amber-600">Power Capsule</span> से
          </h2>

          <p className="mt-6 text-2xl text-gray-600">
            100% आयुर्वेदिक • सुरक्षित • तेज असर • किफायती कीमत
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900">100% प्राकृतिक</h3>
              <p className="text-gray-600 mt-3">शुद्ध आयुर्वेदिक जड़ी-बूटियां</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900">तेज़ असर</h3>
              <p className="text-gray-600 mt-3">15-20 दिन में रिजल्ट</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900">पूरी तरह सुरक्षित</h3>
              <p className="text-gray-600 mt-3">कोई side effect नहीं</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-2xl font-bold text-gray-900">भरोसेमंद</h3>
              <p className="text-gray-600 mt-3">10,000+ खुश ग्राहक</p>
            </div>
          </div>
        </div>
      </section>
      {/* 7 Powerful Ingredients Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#fffdf8] border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
              🌿 प्राचीन आयुर्वेद का विज्ञान
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-gray-900">
              7 शक्तिशाली जड़ी-बूटियां
            </h2>
            <p className="mt-5 text-2xl text-gray-600 max-w-4xl mx-auto">
              हर ingredient को खास तौर पर चुना गया है आपकी परफॉर्मेंस बढ़ाने के लिए
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              ["अश्वगंधा", "तनाव कम करता है और नियंत्रण बढ़ाता है", "मानसिक stress को दूर करके performance anxiety को कम करता है।"],
              ["कौंच बीज", "इच्छा और उत्तेजना को बढ़ाता है", "Natural testosterone booster है जो desire को बढ़ाता है।"],
              ["शिलाजीत", "ऊर्जा और स्टैमिना में वृद्धि", "शरीर में शक्ति और लंबे समय तक एक्टिव रखता है।"],
              ["सफेद मुसली", "शक्ति और सहनशक्ति बढ़ाता है", "physical strength और endurance को बेहतर बनाता है।"],
              ["शतावरी", "लंबे समय तक performance", "Body endurance बढ़ाता है और premature issues में मदद करता है।"],
              ["विदारीकंद", "यौन शक्ति में वृद्धि", "Male reproductive support और overall performance improve करता है।"],
              ["पिप्पली", "तेज असर के लिए absorption", "बाकी ingredients को जल्दी absorb होने में मदद करता है।"],
            ].map((item, index) => (
              <div key={index} className="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm hover:shadow-md transition relative">
                <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-3xl font-bold text-amber-600 mb-4">{item[0]}</h3>
                <p className="text-xl font-semibold text-gray-800 mb-4">{item[1]}</p>
                <p className="text-gray-600 text-lg leading-8">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Result Highlight Separate Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-20 md:px-16">
        <div className="max-w-6xl mx-auto rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] px-8 py-16 text-center shadow-sm">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            परिणाम?
          </h2>
          <p className="mt-6 text-3xl md:text-4xl font-bold text-amber-600">
            शरीर पूरी तरह चार्ज हो जाता है 💪
          </p>
          <p className="mt-6 text-xl md:text-2xl text-gray-600">
            Timing, Stamina, Control - सब कुछ naturally बढ़ता है।
          </p>
        </div>
      </section>
      {/* Mental & Relationship Confidence Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/images/confidence-couple.jpg"
              alt="Confidence and relationship improvement"
              width={700}
              height={700}
              className="rounded-3xl border border-amber-300 shadow-sm object-cover w-full"
            />
          </div>

          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              सिर्फ शारीरिक नहीं,
              <br />
              मानसिक बदलाव भी
            </h2>

            <p className="mt-6 text-2xl text-gray-600 leading-10">
              जब आपकी timing और performance improve होती है, तो सबसे बड़ा फायदा यह होता है:
            </p>

            <div className="mt-10 space-y-8">
              {[
                ["डर खत्म", "अब बिस्तर पर जाने से पहले घबराहट नहीं होगी"],
                ["Confidence बढ़ेगा", "खुद पर पूरा भरोसा, कोई शर्म नहीं"],
                ["पार्टनर की खुशी", "आपकी performance से वो पूरी तरह संतुष्ट"],
                ["रिश्ते मजबूत", "intimacy की वजह से bond और प्यार बढ़ेगा"],
                ["असली मर्द का एहसास", "अपनी मर्दानगी पर गर्व महसूस करोगे"],
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#fffdf8] border border-amber-300 flex items-center justify-center text-amber-600 font-bold">✓</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{item[0]}</h3>
                    <p className="text-gray-600 text-xl mt-1">{item[1]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] px-8 py-8 shadow-sm">
              <p className="text-3xl font-bold text-amber-600">
                जब performance सही हो, तो confidence automatically आ जाता है।
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Honest FAQ Section - Same Grey Theme */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#fffdf8] border border-red-200 text-red-600 text-sm font-semibold shadow-sm">
              ♡ सचाई जानें
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              क्या Power Capsule से साइज़ बढ़ता है?
            </h2>
          </div>

          <div className="mt-12 rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
            <h3 className="text-3xl font-bold text-red-500 text-center">
              ईमानदारी से कहें तो - नहीं।
            </h3>
            <p className="mt-6 text-xl text-gray-600 text-center leading-9">
              Power Capsule permanently साइज़ नहीं बढ़ाता। और कोई भी product permanently नहीं बढ़ा सकता।
            </p>

            <div className="mt-10 rounded-3xl border border-amber-200 bg-[#fffdf8] px-8 py-8">
              <h4 className="text-3xl font-bold text-amber-600 text-center">
                लेकिन यह ज़रूर करता है:
              </h4>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">⚡ Erection Quality में सुधार</p>
                  <p className="text-gray-600 text-lg">Harder, fuller, और longer lasting erection</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">📈 Blood Flow बढ़ता है</p>
                  <p className="text-gray-600 text-lg">जिससे erect होने पर maximum size achieve होता है</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">❤️ Firmness और Strength</p>
                  <p className="text-gray-600 text-lg">कमजोर erection की problem solve होती है</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] px-8 py-8 text-center shadow-sm">
              <p className="text-2xl text-gray-800 font-semibold">यानी असली बात यह है कि -</p>
              <p className="text-4xl font-bold text-amber-600 mt-3">
                साइज़ से ज़्यादा important है quality और timing!
              </p>
              <p className="text-xl text-gray-600 mt-5 leading-8">
                और Power Capsule exactly यही improve करता है। हम आपसे झूठ नहीं बोलते - इसलिए आप हम पर भरोसा कर सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Comparison Pricing Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#fffdf8] border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
              🏷️ सबसे बड़ा फायदा
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              70% सस्ता, लेकिन Quality में कोई कमी नहीं!
            </h2>
            <p className="mt-6 text-2xl text-gray-600">
              हमने कैसे यह possible बनाया?
            </p>
          </div>

          <div className="mt-14 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm overflow-hidden">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">तुलना देखें</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr>
                    <th className="bg-[#fffdf8] border border-amber-200 rounded-l-2xl px-6 py-4 text-xl text-gray-900">Feature</th>
                    <th className="bg-[#fffdf8] border-y border-amber-200 px-6 py-4 text-xl text-red-500">अन्य Brands</th>
                    <th className="bg-[#fffdf8] border border-amber-200 rounded-r-2xl px-6 py-4 text-xl text-amber-600">Power Capsule</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["कीमत प्रति महीना", "₹3,500 - ₹5,000", "₹999 (70% सस्ता)"],
                    ["Ingredients", "Chemical-based", "100% Ayurvedic"],
                    ["असर दिखने का समय", "2-3 महीने", "15-20 दिन में"],
                    ["Side Effects", "हो सकते हैं", "कोई नहीं"],
                    ["Availability", "Limited stores", "पूरे भारत में"],
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-5 text-lg text-gray-800 border-b border-gray-100">{row[0]}</td>
                      <td className="px-6 py-5 text-lg text-red-500 font-semibold border-b border-gray-100">{row[1]}</td>
                      <td className="px-6 py-5 border-b border-gray-100">
                        <span className="inline-block rounded-xl bg-[#fffdf8] border border-amber-200 px-5 py-2 text-lg font-bold text-amber-600">
                          {row[2]}
                        </span>
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
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-20 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["रिश्ता मजबूत", "Physical intimacy improve होने से emotional bond भी बढ़ेगा", "❤️", "text-red-500"],
            ["Confidence Boost", "अपनी मर्दानगी पर गर्व महसूस करोगे, सीना चौड़ा होगा", "✨", "text-amber-600"],
            ["कोई शर्मिंदगी नहीं", "जल्दी निकल जाने का guilt और embarrassment हमेशा के लिए खत्म", "🏅", "text-amber-600"],
          ].map((card, index) => (
            <div key={index} className="rounded-3xl border border-amber-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition min-h-[260px] flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-amber-600 mb-6">{card[0]}</h3>
                <p className="text-gray-600 text-xl leading-9">{card[1]}</p>
              </div>
              <div className={`text-6xl mt-8 ${card[3]}`}>{card[2]}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Future Lifestyle Visualization Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900">ज़रा सोचिए...</h2>
            <p className="mt-5 text-2xl text-gray-600">
              Power Capsule लेने के बाद आपकी ज़िंदगी कैसी होगी?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="rounded-3xl border border-amber-200 overflow-hidden bg-white shadow-sm">
              <div className="h-72 bg-[url('/images/night-excitement.jpg')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-3xl font-bold text-amber-600">रात का इंतज़ार होगा</h3>
                <p className="text-gray-600 text-xl mt-4">अब आप excited होंगे बिस्तर पर जाने के लिए, डर नहीं लगेगा</p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 overflow-hidden bg-white shadow-sm">
              <div className="h-72 bg-[url('/images/partner-happy.jpg')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-3xl font-bold text-amber-600">पार्टनर की आँखों में चमक</h3>
                <p className="text-gray-600 text-xl mt-4">जब आप 20+ मिनट रुकोगे, तो देखिए उनकी खुशी</p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-white px-8 py-10 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-amber-600">Complete Control</h3>
                <p className="text-gray-600 text-xl mt-4">अब आप decide करेंगे कब finish करना है, automatic नहीं होगा</p>
              </div>
              <div className="text-6xl mt-8 text-green-500">✅</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              ["रिश्ता मजबूत", "Physical intimacy improve होने से emotional bond भी बढ़ेगा", "❤️", "text-red-500"],
              ["Confidence Boost", "अपनी मर्दानगी पर गर्व महसूस करोगे, सीना चौड़ा होगा", "✨", "text-amber-600"],
              ["कोई शर्मिंदगी नहीं", "जल्दी निकल जाने का guilt और embarrassment हमेशा के लिए खत्म", "🏅", "text-amber-600"],
            ].map((card, index) => (
              <div key={index} className="rounded-3xl border border-amber-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition min-h-[260px] flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-amber-600 mb-6">{card[0]}</h3>
                  <p className="text-gray-600 text-xl leading-9">{card[1]}</p>
                </div>
                <div className={`text-6xl mt-8 ${card[3]}`}>{card[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Reality CTA Highlight Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-20 md:px-16">
        <div className="max-w-6xl mx-auto rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] px-8 py-14 text-center shadow-sm">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-600">
            यह सिर्फ कल्पना नहीं है 🎯
          </h2>
          <p className="mt-5 text-2xl text-gray-700">
            यह आपकी नई reality बन सकती है!
          </p>
          <p className="mt-5 text-xl text-gray-600">
            हज़ारों पुरुष पहले ही इस बदलाव को जी रहे हैं। अब आपकी बारी है।
          </p>
        </div>
      </section>
      {/* Safety & Natural Assurance Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#fffdf8] border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
              🛡️ सुरक्षा की गारंटी
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-gray-900">
              100% सुरक्षित और प्राकृतिक
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              ["🌿", "पूरी तरह आयुर्वेदिक", "कोई chemical नहीं, सिर्फ प्राकृतिक जड़ी-बूटियां"],
              ["🛡️", "कोई Side Effect नहीं", "हजारों users - एक भी complaint नहीं"],
              ["✅", "Regular Use के लिए Safe", "रोज ले सकते हैं, कोई खतरा नहीं"],
              ["🏅", "Quality Certified", "Lab tested और approved ingredients"],
            ].map((item, index) => (
              <div key={index} className="rounded-3xl border border-amber-200 bg-white px-8 py-10 shadow-sm min-h-[260px] flex flex-col justify-between">
                <div className="text-5xl">{item[0]}</div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mt-6">{item[1]}</h3>
                  <p className="text-gray-600 text-xl mt-4 leading-9">{item[2]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-amber-300 bg-gradient-to-r from-[#fff7ed] via-[#fffdf8] to-[#fefce8] px-8 py-10 shadow-sm">
            <h3 className="text-3xl font-bold text-center text-gray-900">📌 महत्वपूर्ण नोट</h3>
            <div className="mt-8 space-y-5 text-xl text-gray-700">
              <p>✅ किसी भी उम्र के पुरुष ले सकते हैं (18+)</p>
              <p>✅ दूसरी दवाइयों के साथ भी safe</p>
              <p>✅ Diabetes और BP patients भी ले सकते हैं</p>
              <p>✅ कोई habit forming नहीं - जब चाहें बंद कर सकते हैं</p>
            </div>
            <p className="mt-8 text-center text-xl text-gray-600 italic">
              अगर किसी serious medical condition में हैं तो doctor से consult जरूर करें
            </p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] px-8 py-24 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#fffdf8] border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
              ☆ असली ग्राहकों की राय
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              10,000+ खुश ग्राहक क्या कहते हैं?
            </h2>
            <p className="mt-5 text-2xl text-gray-600">
              यह stories हैं उन लोगों की जिन्होंने Power Capsule से अपनी ज़िंदगी बदली
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
              <div key={index} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                {t.image && (
                  <div className="h-56 rounded-2xl bg-[url('/images/testimonial-user.jpg')] bg-cover bg-center mb-6" />
                )}
                <div className="text-amber-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 text-xl leading-10 italic">{t.quote}</p>
                <div className="border-t border-gray-200 mt-6 pt-5">
                  <p className="text-2xl font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-600 text-lg mt-1">{t.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Premium Footer Section */}
      <footer className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] border-t border-amber-200 px-8 py-16 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-4xl font-bold text-amber-600">Power Capsule</h3>
            <p className="mt-4 text-xl text-gray-600">आपकी मर्दानगी का असली साथी</p>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-lg text-gray-600">
              <li><a href="/privacy-policy" className="hover:text-amber-600 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-amber-600 transition">Terms & Conditions</a></li>
              <li><a href="/return-policy" className="hover:text-amber-600 transition">Return Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-5">संपर्क करें</h4>
            <div className="space-y-3 text-lg text-gray-600">
              <p>📞 +91-XXXXX-XXXXX</p>
              <p>💬 WhatsApp Support</p>
            </div>
          </div>
        </div>
      </footer>

      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Solution Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
          <span className="text-amber-500 text-xs">✨</span>
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">समाधान आ गया है</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          मिलिए <span className="text-amber-500">Power Capsule</span> से
        </h2>

        {/* Sub-heading with bullet separators */}
        <p className="text-gray-400 text-lg md:text-xl font-medium flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-16">
          <span>100% आयुर्वेदिक</span>
          <span className="text-amber-500/50">•</span>
          <span>सुरक्षित</span>
          <span className="text-amber-500/50">•</span>
          <span>तेज़ असर</span>
          <span className="text-amber-500/50">•</span>
          <span>किफायती कीमत</span>
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-10 rounded-[32px] border ${feature.borderColor} ${feature.bgColor} backdrop-blur-md transition-all hover:scale-105 hover:bg-white/5 duration-300 group`}
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Floating CTA (Simulating your screenshot's bottom button) */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all flex items-center gap-3 active:scale-95 uppercase tracking-wide">
            <span className="animate-pulse">💬</span>
            अभी ऑर्डर करें - 30% OFF
          </button>
        </div>
      </div>
    </section>
    </div>
  );
}