import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Terms & Conditions | Kin Ultrapower",
};

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#121b1e] text-white">
      {/* --- Hero Section --- */}
      <div className="py-12 px-4 text-center bg-gradient-to-b from-[#1a2a2e] to-[#121b1e]">
        <div className="flex justify-center mb-6">
          {/* Back Button to Product Page */}
          <Link href="/product/kin-ultrapower">
            <div className="w-12 h-12 rounded-full border border-orange-400/30 flex items-center justify-center text-orange-400 cursor-pointer hover:bg-orange-400/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-400 text-lg">SHREE MBM PHARMACEUTICALS (Kin Ultrapower)</p>
      </div>

      {/* --- Policy Content Card --- */}
      <div className="max-w-4xl mx-auto px-4 pb-20 -mt-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 text-gray-800 shadow-2xl">
          <p className="mb-10 text-lg leading-relaxed">
            By accessing and using the <span className="font-bold text-orange-600">Kin Ultrapower</span> website or landing page, owned and operated by <span className="font-bold">SHREE MBM PHARMACEUTICALS</span>, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use this website.
          </p>

          {/* 1. Information Disclaimer */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              1. Information Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The content available on this website is provided for general informational and awareness purposes only. While SHREE MBM PHARMACEUTICALS strives to ensure that all information is accurate and up to date, we do not guarantee the completeness, reliability, or accuracy of the content. Any action you take based on the information provided is strictly at your own risk.
            </p>
          </div>

          {/* 2. User Responsibilities */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              2. User Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Users agree to use this website only for lawful purposes. You must not misuse this website in any way that could damage, disable, or impair its functionality or interfere with other users. Unauthorized access, data extraction, or any attempt to harm the website may result in legal action.
            </p>
          </div>

          {/* 3. Intellectual Property */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              3. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, images, graphics, logos, and design elements, is the intellectual property of <span className="font-semibold">SHREE MBM PHARMACEUTICALS</span> and is protected under applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
            </p>
          </div>

          {/* 4. Third-Party Links */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              4. Third-Party Links
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This website may include links to third-party websites for additional information or convenience. SHREE MBM PHARMACEUTICALS does not control and is not responsible for the content, policies, or practices of any third-party websites.
            </p>
          </div>

          {/* 5. Updates & Modifications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              5. Updates & Modifications
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to update, modify, or remove any part of the website or these Terms & Conditions at any time without prior notice. It is your responsibility to review this page periodically for any updates.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SHREE MBM PHARMACEUTICALS shall not be held liable for any direct, indirect, or incidental damages arising from the use or inability to use this website, including but not limited to loss of data, business interruption, or other related issues.
            </p>
          </div>

          {/* 7. Contact Us */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For any queries or concerns, you may contact us through the details provided on our website or via our official WhatsApp Support.
            </p>
            <Link href="https://wa.me/919217900585" target="_blank" className="text-orange-600 font-bold hover:underline">
              → Contact Support on WhatsApp
            </Link>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium">
              By continuing to use this website, you confirm that you have read, understood, and agreed to these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;