import crypto from "crypto";
import { Request, Response } from "express";
import Order from "../models/order.model";
import { sendOrderConfirmation } from "../services/email.service";

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // Ensure your frontend is sending this in the body!
    } = req.body;

    // 1. Verify Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await Order.updateOne({ orderId }, { status: "failed" });
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // 2. Update Database (Crucial: This must happen before the email)
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      {
        status: "paid",
        "payment.razorpay_payment_id": razorpay_payment_id,
        "payment.razorpay_order_id": razorpay_order_id,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 3. Trigger Email (This is why it wasn't working!)
    if (updatedOrder.customer?.email) {
      console.log(`📧 Attempting to send email to: ${updatedOrder.customer.email}`);
      
      await sendOrderConfirmation(updatedOrder.customer.email, {
        id: updatedOrder.orderId,
        items: updatedOrder.products.map((p: any) => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          imageUrl: p.imageUrl
        })),
        
        estimatedDelivery: "5-7 Business Days"
      });
    }

    // 4. Final Success Response
    return res.status(200).json({
      success: true,
      message: "Payment verified and confirmation email sent",
      orderId: updatedOrder.orderId
    });

  } catch (error) {
    console.error("❌ Payment Verification Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};