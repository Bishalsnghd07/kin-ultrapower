// // // payment.controller.ts
// // import { Request, Response } from "express";
// // import Order from "../models/order.model";
// // import { sendOrderConfirmation } from "../services/email.service";
// // import Razorpay from "razorpay";

// // import crypto from "crypto";

// // export const verifyPayment = async (req: Request, res: Response) => {
// //   const {
// //     orderId,
// //     razorpay_payment_id,
// //     razorpay_order_id,
// //     razorpay_signature,
// //   } = req.body;

// //   try {
// //     // 1. Verify the signature
// //     const expectedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
// //       .update(razorpay_order_id + "|" + razorpay_payment_id)
// //       .digest("hex");

// //     if (expectedSignature !== razorpay_signature) {
// //       await Order.updateOne({ orderId }, { status: "failed" });
// //       return res.status(400).json({ error: "Invalid signature" });
// //     }

// //     // 2. Capture payment info in DB
// //     await Order.updateOne(
// //       { orderId },
// //       {
// //         status: "paid",
// //         "payment.razorpay_payment_id": razorpay_payment_id,
// //         "payment.razorpay_order_id": razorpay_order_id,
// //         "payment.razorpay_signature": razorpay_signature,
// //       }
// //     );

// //     // 3. Send confirmation email
// //     const order = await Order.findOne({ orderId });
// //     if (order?.customer?.email) {
// //       await sendOrderConfirmation(order.customer.email, {
// //         id: order.orderId,
// //         items: order.products.map((p) => ({
// //           name: p.name,
// //           price: p.price,
// //           quantity: p.quantity,
// //           imageUrl: p.imageUrl ?? undefined,
// //         })),
// //         estimatedDelivery: new Date(
// //           Date.now() + 5 * 86400000
// //         ).toLocaleDateString(),
// //       });
// //     }

// //     res.json({ success: true });
// //   } catch (error) {
// //     console.log("Payment verification failed:", error);
// //     console.log("Order ID:", orderId);
// //     console.log("Payment ID:", razorpay_payment_id);
// //     await Order.updateOne({ orderId }, { status: "failed" });
// //     res.status(400).json({ error: "Payment verification failed" });
// //   }
// // };

// // // const razorpay = new Razorpay({
// // //   key_id: process.env.RAZORPAY_KEY_ID,
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // });

// // // export const verifyPayment = async (req: Request, res: Response) => {
// // //   const { orderId, paymentId } = req.body;

// // //   try {
// // //     // 1. Verify with Razorpay
// // //     const payment = await razorpay.payments.fetch(paymentId);

// // //     // 2. Update order if successful
// // //     if (payment.status === "captured") {
// // //       await Order.updateOne(
// // //         { orderId },
// // //         {
// // //           status: "paid",
// // //           "payment.razorpay_payment_id": paymentId,
// // //         }
// // //       );

// // //       // 3. Send confirmation email
// // //       const order = await Order.findOne({ orderId });
// // //       if (!order || !order.customer) {
// // //         throw new Error("Order or customer not found");
// // //       }
// // //       await sendOrderConfirmation(order.customer.email, {
// // //         id: order.orderId,
// // //         items: order.products.map((p) => ({
// // //           name: p.name,
// // //           price: p.price,
// // //           quantity: p.quantity,
// // //           imageUrl: p.imageUrl ?? undefined,
// // //         })),
// // //         estimatedDelivery: new Date(
// // //           Date.now() + 5 * 24 * 60 * 60 * 1000
// // //         ).toLocaleDateString(),
// // //       });
// // //     }

// // //     res.json({ success: true });
// // //   } catch (error) {
// // //     await Order.updateOne({ orderId }, { status: "failed" });
// // //     res.status(400).json({ error: "Payment verification failed" });
// // //   }
// // // };
// import crypto from "crypto";
// import { Request, Response } from "express";

// export const verifyPayment = (req: Request, res: Response) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature === razorpay_signature) {
//       return res.status(200).json({
//         success: true,
//         message: "Payment verified successfully",
//       });
//     } else {
//       return res.status(400).json({
//         error: "Payment verification failed",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       error: "Something went wrong",
//     });
//   }
// };

import crypto from "crypto";
import { Request, Response } from "express";
import Order from "../models/order.model"; // Make sure this path is correct
import { sendOrderConfirmation } from "../services/email.service";

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // We pass this from frontend to find the specific record
    } = req.body;

    // 1. Verify the signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // If signature fails, mark order as failed in DB
      await Order.updateOne({ orderId }, { status: "failed" });
      return res.status(400).json({
        error: "Payment verification failed: Invalid signature",
      });
    }

    // 2. Update the Order Status in the Database
    // We update status to 'paid' and store the payment ID for reference
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      {
        status: "paid",
        "payment.razorpay_payment_id": razorpay_payment_id,
        "payment.razorpay_order_id": razorpay_order_id,
      },
      { new: true } // returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found in database" });
    }

    // 3. Send Confirmation Email
    if (updatedOrder.customer?.email) {
      try {
        await sendOrderConfirmation(updatedOrder.customer.email, {
          id: updatedOrder.orderId,
          items: updatedOrder.products.map((p: any) => ({
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            imageUrl: p.imageUrl ?? undefined,
          })),
          estimatedDelivery: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        });
        console.log(`✅ Confirmation email sent to ${updatedOrder.customer.email}`);
      } catch (emailErr) {
        console.error("❌ Email service failed, but payment was successful:", emailErr);
        // We don't return an error here because the payment was actually successful
      }
    }

    // 4. Return success and the real orderId for the frontend
    return res.status(200).json({
      success: true,
      message: "Payment verified and order updated",
      orderId: updatedOrder.orderId, 
    });

  } catch (error) {
    console.error("Critical Payment Error:", error);
    return res.status(500).json({
      error: "An internal error occurred during payment verification",
    });
  }
};