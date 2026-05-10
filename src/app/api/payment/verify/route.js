import crypto from "crypto";

const getRazorpaySecret = () => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_LIVE_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Razorpay secret is not configured.");
  }

  return keySecret;
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json(
        { success: false, message: "Missing Razorpay verification parameters." },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", getRazorpaySecret())
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isValid) {
      return Response.json(
        { success: false, message: "Invalid Razorpay signature." },
        { status: 400 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
