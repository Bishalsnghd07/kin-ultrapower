// import sgMail from "@sendgrid/mail";

// // Initialize SendGrid
// if (!process.env.SENDGRID_API_KEY) {
//   throw new Error("SENDGRID_API_KEY is missing in environment variables!");
// }

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export async function sendOrderConfirmation(
//   email: string,
//   order: {
//     id: string;
//     items: Array<{
//       name: string;
//       price: number;
//       quantity: number;
//       imageUrl?: string;
//     }>;
//     estimatedDelivery: string;
//   }
// ) {
//   try {
//     // Validate email format
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       throw new Error("Invalid recipient email address");
//     }

//     // Check if sender email is set
//     if (!process.env.SENDER_EMAIL) {
//       throw new Error("SENDER_EMAIL is not configured");
//     }

//     const itemsHTML = order.items
//       .map(
//         (item) => `
//       <tr>
//         <td>
//           <img
//             src="${item.imageUrl || "https://via.placeholder.com/80"}"
//             alt="${item.name}"
//             width="80"
//             style="display: block; border: 1px solid #eee;"
//           >
//         </td>
//         <td style="padding: 10px;">
//           <strong>${item.name}</strong><br>
//           Qty: ${item.quantity}<br>
//           Price: ₹${item.price.toFixed(2)}
//         </td>
//       </tr>
//     `
//       )
//       .join("");

//     const msg = {
//       to: email,
//       from: {
//         email: process.env.SENDER_EMAIL,
//         name: "E-Commerce Jewellery Web App by Bishal",
//       },
//       subject: `Your Jewellery Order #${order.id}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
//             <h1 style="color: #d87d4a;">Thank You For Your Order!</h1>
//           </div>

//           <div style="padding: 20px;">
//             <h3>Order #${order.id}</h3>
//             <p>Estimated delivery: <strong>${
//               order.estimatedDelivery
//             }</strong></p>

//             <h4>Your Items:</h4>
//             <table style="width: 100%; border-collapse: collapse;">
//               ${itemsHTML}
//             </table>

//             <p style="margin-top: 20px;">
//               <a href="https://luxe-jewels-six.vercel.app/orders/${order.id}"
//                  style="background-color: #d87d4a; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
//                 Track Your Order
//               </a>
//             </p>
//           </div>

//           <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px;">
//             <p>© ${new Date().getFullYear()} Luxe Jewels. All rights reserved.</p>
//           </div>
//         </div>
//       `,
//       // mailSettings: {
//       //   bypassListManagement: { enable: false },
//       //   spamCheck: { enable: true, threshold: 5 },
//       // },

//       // ... other email config
//       mailSettings: {
//         bypassListManagement: { enable: false }, // Don't bypass spam filters
//         // REMOVE spamCheck entirely
//       },
//       headers: {
//         // Add these headers for better deliverability
//         "X-Entity-Ref-ID": order.id, // Unique identifier
//       },
//     };

//     console.log("Attempting to send email to:", email); // Debug log
//     await sgMail.send(msg);
//     console.log("Email sent successfully!");
//   } catch (error) {
//     console.error("Failed to send order confirmation email:", error);

//     // Log detailed SendGrid error response if available
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "response" in error &&
//       typeof (error as any).response === "object" &&
//       (error as any).response !== null &&
//       "body" in (error as any).response
//     ) {
//       console.error("SendGrid API Response:", (error as any).response.body);
//     }

//     throw error; // Re-throw to handle in the calling function
//   }
// }

import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is missing in environment variables!");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOrderConfirmation(
  email: string,
  order: {
    id: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      imageUrl?: string;
    }>;
    estimatedDelivery: string;
  }
) {
  try {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid recipient email address");
    }

    if (!process.env.SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL is not configured");
    }

    const itemsHTML = order.items
      .map((item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.imageUrl || "https://via.placeholder.com/80"}" alt="${item.name}" width="80" style="display: block; border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong style="color: #333;">${item.name}</strong><br>
          <span style="color: #666;">Qty: ${item.quantity} | Price: ₹${item.price}</span>
        </td>
      </tr>`)
      .join("");

    const msg = {
      to: email,
      from: {
        email: process.env.SENDER_EMAIL,
        name: "Kin Ultrapower Support", // Updated Brand Name
      },
      subject: `Order Confirmed: #${order.id} - Your Power is on the Way!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0;">KIN ULTRAPOWER</h1>
            <p style="color: #fff; margin-top: 10px;">Your transformation has begun.</p>
          </div>

          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #333;">Thank you for your order!</h2>
            <p style="color: #555;">Order ID: <strong>${order.id}</strong></p>
            <p style="color: #555;">Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              ${itemsHTML}
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://shreembmayurveda.in/orders/${order.id}" 
                 style="background-color: #f59e0b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                TRACK YOUR ORDER
              </a>
            </div>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p>© ${new Date().getFullYear()} Shreembm Ayurveda. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    console.log("🚀 Attempting to send email to:", email);
    await sgMail.send(msg);
    console.log("✅ Email sent successfully!");
  } catch (error: any) {
    console.error("❌ SendGrid Error Details:", error.response?.body || error.message);
    throw error;
  }
}