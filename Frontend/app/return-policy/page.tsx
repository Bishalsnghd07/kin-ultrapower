import Link from 'next/link';
import React from 'react';

const RefundShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#121b1e] text-white">
      {/* --- Hero Section --- */}
      <div className="py-12 px-4 text-center bg-gradient-to-b from-[#1a2a2e] to-[#121b1e]">
        <div className="flex justify-center mb-6">
          {/* Back Arrow Icon */}
          <Link href="/product/kin-ultrapower">
            <div className="w-12 h-12 rounded-full border border-orange-400/30 flex items-center justify-center text-orange-400 cursor-pointer hover:bg-orange-400/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund & Shipping Policy</h1>
        <p className="text-gray-400 text-lg">For Prepaid Orders – SHREE MBM PHARMACEUTICALS (Kin Ultrapower)</p>
      </div>

      {/* --- Policy Content --- */}
      <div className="max-w-4xl mx-auto px-4 pb-20 -mt-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 text-gray-800 shadow-2xl">
          <p className="mb-10 text-lg leading-relaxed">
            At <span className="font-bold">SHREE MBM PHARMACEUTICALS</span>, we aim to provide a smooth and transparent experience for all prepaid orders. This policy explains the refund process based on Order Cancellation and RTO (Return to Origin), along with our Shipping Policy.
          </p>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900">
              <span className="text-orange-500 text-3xl">ⓧ</span> 1. Order Cancellation (Prepaid Orders)
            </h2>
            <ul className="list-disc ml-8 space-y-2 text-gray-600">
              <li>Customers can request cancellation of a prepaid order only before the order has been dispatched.</li>
              <li>If the cancellation request is made before dispatch, a full refund will be initiated.</li>
              <li>Once the order has been dispatched, cancellation requests will not be accepted.</li>
              <li>Approved refunds will be processed within <span className="font-semibold text-gray-900">5–7 business days</span> through the original payment method.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900">
              <span className="text-orange-500 text-3xl">↺</span> 2. RTO (Return to Origin)
            </h2>
            <p className="mb-4 text-gray-600 italic">RTO occurs when the order is not successfully delivered and is returned back to our facility due to reasons such as:</p>
            <ul className="list-disc ml-8 space-y-2 mb-4 text-gray-600">
              <li>Incorrect or incomplete address</li>
              <li>Customer not available at the time of delivery</li>
              <li>Refusal to accept the order</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400">
              <p className="font-bold mb-2">In such cases:</p>
              <ul className="list-disc ml-4 space-y-2 text-gray-600">
                <li>Once the product is received back at our warehouse, a refund will be processed after deducting shipping and handling charges.</li>
                <li>Refunds will only be initiated after verifying the condition of the returned product.</li>
                <li>The refund process may take 5–7 business days after successful verification.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900">
              <span className="text-orange-500 text-3xl">📦</span> 3. Shipping Policy
            </h2>
            <ul className="list-disc ml-8 space-y-2 text-gray-600 mb-6">
              <li>At SHREE MBM PHARMACEUTICALS, we ensure timely and reliable delivery of all orders.</li>
              <li>Orders are processed within 1–2 business days after confirmation.</li>
              <li>Delivery usually takes 3–7 business days, depending on the location.</li>
              <li>Tracking details will be shared once the order is dispatched.</li>
            </ul>
            
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h3 className="font-bold text-orange-800 mb-2">Shipping Charges Policy (Kin Ultrapower):</h3>
              <ul className="space-y-1 text-orange-900">
                <li>• For orders of <span className="font-bold underline">Pack of 2</span>, shipping charges will be applied.</li>
                <li>• For orders of <span className="font-bold underline">Pack of 3 or more</span>, shipping charges will be completely free.</li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">Shipping timelines may be affected due to external factors such as weather conditions, public holidays, or courier delays. Customers are advised to provide accurate details.</p>
          </div>

          {/* Section 4 */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900 underline decoration-orange-400 underline-offset-4">Important Notes</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Refunds are applicable only for prepaid orders.</li>
              <li>• Shipping and handling charges are non-refundable in RTO cases.</li>
              <li>• SHREE MBM PHARMACEUTICALS reserves the right to approve or reject any request in case of policy misuse.</li>
            </ul>
            <p className="mt-8 text-center text-gray-400 text-sm">
              By placing an order, you agree to the terms mentioned in this Refund & Shipping Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundShippingPolicy;