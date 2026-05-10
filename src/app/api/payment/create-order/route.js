const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";

const getRazorpayCredentials = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_LIVE_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  return { keyId, keySecret };
};

const getBasicAuthHeader = (keyId, keySecret) => {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
};

const sanitizeAmount = (body) => {
  const amountInPaise = Number(body.amountInPaise || Number(body.amount || 49) * 100);

  if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
    throw new Error("Invalid payment amount.");
  }

  return Math.round(amountInPaise);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { keyId, keySecret } = getRazorpayCredentials();
    const amount = sanitizeAmount(body);
    const receipt = `qcs_linkedin_${Date.now()}`.slice(0, 40);

    const response = await fetch(RAZORPAY_ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getBasicAuthHeader(keyId, keySecret),
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt,
        notes: {
          service: String(body.service || "profile-rewrite-100-score"),
          auditScore: String(body.auditScore || ""),
          linkedinUrl: String(body.linkedinUrl || ""),
          role: String(body.role || ""),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { success: false, message: data?.error?.description || "Unable to create Razorpay order", error: data },
        { status: response.status }
      );
    }

    return Response.json({ success: true, order: data });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || "Unable to create payment order" },
      { status: 500 }
    );
  }
}
