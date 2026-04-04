import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Kin Ultrapower",
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#121b1e] text-white">
      {/* --- Hero Section --- */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#1a2a2e] to-[#121b1e]">
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-lg">SHREE MBM PHARMACEUTICALS (Kin Ultrapower)</p>
      </div>

      {/* --- Policy Content Card --- */}
      <div className="max-w-4xl mx-auto px-4 pb-20 -mt-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 text-gray-800 shadow-2xl">
          <p className="mb-10 text-lg leading-relaxed">
            At <span className="font-bold text-orange-600">SHREE MBM PHARMACEUTICALS</span>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or interact with our website or landing page for <span className="font-bold">Kin Ultrapower</span>.
          </p>

          {/* 1. Information We Collect */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When you use our website, we may collect personal information such as your name, phone number, and email address only when you voluntarily provide it through forms or inquiries. We may also collect non-personal information like your browsing activity, device type, browser information, and IP address to better understand user behavior and improve our website experience.
            </p>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The information we collect is used to respond to your queries, provide relevant information, improve our services, and occasionally send updates or promotional offers if you have opted to receive them.
            </p>
          </div>

          {/* 3. Data Protection */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, rent, or share your personal information with third parties for marketing purposes. Your data is kept secure using standard security measures, and we only share information when required by law or to protect our legal rights.
            </p>
          </div>

          {/* 4. Cookies */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              4. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and remember your preferences. You can choose to disable cookies through your browser settings at any time.
            </p>
          </div>

          {/* 5. Third-Party Services */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              5. Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may also use third-party services such as analytics tools or social media platforms, which operate under their own privacy policies. SHREE MBM PHARMACEUTICALS is not responsible for the privacy practices of these external services.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              6. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or request deletion of your personal information. You may also opt out of receiving any marketing communications from us at any time by contacting us directly.
            </p>
          </div>

          {/* 7. Children's Privacy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              7. Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children.
            </p>
          </div>

          {/* 8. Policy Updates */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              8. Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SHREE MBM PHARMACEUTICALS reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with an updated effective date.
            </p>
          </div>

          {/* 9. Contact Us */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-orange-100 pb-2">
              9. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions or concerns, you can contact us through the details provided on our website.
            </p>
            <Link href="https://wa.me/919217900585" target="_blank" className="text-orange-600 font-bold hover:underline">
              → Reach out via WhatsApp Support
            </Link>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium">
              By using our website, you agree to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;