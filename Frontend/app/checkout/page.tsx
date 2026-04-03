"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { API_BASE_URL, createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutFormValues, checkoutSchema } from "../validations/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

const banks = [
  { value: "SBIN", label: "State Bank of India" },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "ICIC", label: "ICICI Bank" },
];

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMode: "upi",
      paymentMethod: "cod",
    },
  });

  const paymentMode = watch("paymentMode");

  const shippingFee = 50;
  const vat = Math.round(cartTotal * 0.2);
  const grandTotal = cartTotal + shippingFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (formData: CheckoutFormValues) => {
    try {
      const subtotal = cartTotal;
      const shipping = 50;
      const tax = cartTotal * 0.2;
      const total = subtotal + shipping + tax;

      // const orderData = {
      //   customer: { ...formData, address: formData.address },
      //   products: cartItems.map((item) => ({
      //     productId: String(item.id),
      //     name: item.name,
      //     price: item.price,
      //     quantity: item.quantity,
      //     imageUrl: item.image || "",
      //   })),
      //   subtotal,
      //   shipping,
      //   tax,
      //   total,
      //   paymentMethod: formData.paymentMethod,
      //   paymentMode: formData.paymentMode,
      //   upiId: formData.paymentMode === "cod" ? formData.upiId : undefined,
      //   selectedBank:
      //     formData.paymentMode === "netbanking"
      //       ? formData.selectedBank
      //       : undefined,
      //   // orderId: `ORD-${Date.now()}`,
      // };

   const orderData = {
  customer: {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: {
      street: formData.address.street,
      city: formData.address.city,
      state: formData.address.state,
      zipCode: formData.address.zipCode,
      country: formData.address.country,
    },
  },

  products: cartItems.map((item) => ({
    productId: String(item.id),
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.image || "",
  })),

  subtotal,
  shipping,
  tax,
  total,

  paymentMethod: formData.paymentMethod,

  // ✅ IMPORTANT FIX
  paymentMode:
    formData.paymentMethod === "cod"
      ? null
      : formData.paymentMode,
};

//       const orderData = {
//   customer: { ...formData },
//   products: cartItems.map((item) => ({
//     productId: String(item.id),
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     imageUrl: item.image || "",
//   })),
//   subtotal,
//   shipping,
//   tax,
//   total,
//   paymentMethod: formData.paymentMethod,
//   paymentMode:
//     formData.paymentMethod === "cod"
//       ? null
//       : formData.paymentMode,
// };

      const response = await createOrder(orderData);

      // COD flow — no Razorpay
      if (formData.paymentMethod === "cod") {
        clearCart();
        router.push(`/checkout/success?orderId=${response.orderId}`);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        Swal.fire("Error", "Razorpay SDK failed to load", "error");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: response.amount * 100,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: response.razorpayOrderId,
        handler: async (razorpayResponse: any) => {
          const verifyRes = await fetch(
            `${API_BASE_URL}/api/orders/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.orderId,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              }),
            }
          );

          if (verifyRes.ok) {
            clearCart();
            router.push(`/checkout/success?orderId=${response.orderId}`);
          } else {
            const err = await verifyRes.json();
            Swal.fire(
              "Payment Failed",
              err.error || "Verification failed",
              "error"
            );
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#F37254" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      Swal.fire("Error", error.message || "Order submission failed", "error");
    }
  };

  return (
  <div className="bg-[#121721] min-h-screen text-white">
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h1 className="text-3xl font-black mb-10 tracking-tight">CHECKOUT</h1>

            {/* Billing Details */}
            <section className="mb-12">
              <h2 className="text-xs font-bold text-amber-500 mb-6 tracking-widest uppercase">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 ml-1">Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 ml-1">Email Address</label>
                  <input
                    {...register("email")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 ml-1">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="mb-12">
              <h2 className="text-xs font-bold text-amber-500 mb-6 tracking-widest uppercase">
                Shipping Info
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 ml-1">Street Address</label>
                  <input
                    {...register("address.street")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none"
                    placeholder="Building name, Street"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 ml-1">City</label>
                    <input
                      {...register("address.city")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none"
                      placeholder="Delhi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 ml-1">ZIP Code</label>
                    <input
                      {...register("address.zipCode")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none"
                      placeholder="110001"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section>
              <h2 className="text-xs font-bold text-amber-500 mb-6 tracking-widest uppercase">
                Payment Details
              </h2>
              <RadioGroup
                value={watch("paymentMode")}
                onValueChange={(value) => setValue("paymentMode", value as "upi" | "netbanking" | "card" | "wallet" | "cod")}
                className="grid gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Label className="text-sm font-semibold self-start text-gray-300">Payment Method</Label>
                  <div className="space-y-4">
                    {['upi', 'cod', 'card'].map((method) => (
                      <div key={method} className={`flex items-center space-x-4 p-4 border rounded-xl transition-all cursor-pointer ${watch("paymentMode") === method ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                        <RadioGroupItem value={method} id={method} className="border-white/30 text-amber-500" />
                        <Label htmlFor={method} className="w-full cursor-pointer font-bold uppercase text-xs tracking-wider">
                          {method === 'upi' ? 'UPI (PhonePe / GooglePay)' : method === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            </section>
          </div>

          {/* Right Column - Summary */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 h-fit border border-white/10 shadow-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-8 tracking-tight">SUMMARY</h2>
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 rounded-xl w-16 h-16 relative overflow-hidden border border-white/10">
                      <Image src={item.image || ""} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase">{item.name}</p>
                      <p className="text-amber-500 font-bold text-sm">₹ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-500">x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">TOTAL</span>
                <span className="font-bold">₹ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">SHIPPING</span>
                <span className="font-bold">₹ {shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">VAT (INCLUDED)</span>
                <span className="font-bold">₹ {vat.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-10 items-center">
              <span className="text-sm text-gray-400 font-bold">GRAND TOTAL</span>
              <span className="text-2xl font-black text-amber-500">₹ {grandTotal.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:scale-[1.02] text-black font-black py-4 rounded-xl transition-all shadow-lg uppercase tracking-widest"
              disabled={cartItems.length === 0}
            >
              CONTINUE & PAY
            </Button>
            
            <p className="text-[10px] text-gray-500 text-center mt-6 uppercase tracking-widest font-bold">
              Secure 256-bit SSL Encrypted Payment
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}
