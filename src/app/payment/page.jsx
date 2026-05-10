'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export default function PaymentPage() {
  const router = useRouter();
  const startedRef = useRef(false);
  const [status, setStatus] = useState("Preparing secure payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const timer = setTimeout(() => {
      startPayment();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  async function startPayment() {
    try {
      setStatus("Creating Razorpay order...");

      const service = localStorage.getItem("linkedin_paid_service") || "profile-rewrite-100-score";
      const amount = Number(localStorage.getItem("linkedin_paid_amount") || 49);
      const auditScore = localStorage.getItem("linkedin_audit_score");
      const linkedinUrl = localStorage.getItem("linkedin_audit_url");
      const role = localStorage.getItem("linkedin_audit_role");
      const auditReport = parseStoredJson(localStorage.getItem("linkedin_audit_report"));

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          amount,
          amountInPaise: amount * 100,
          auditScore,
          linkedinUrl,
          role,
          auditReport,
        }),
      });

      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(data?.message || "Order create failed");
      }

      const order = data?.order || data?.data?.order || (data?.id ? data : data?.data?.id ? data.data : null);

      if (!order?.id) {
        throw new Error(data?.message || "Order create failed: Razorpay order was not returned.");
      }

      setStatus("Loading Razorpay checkout...");
      await ensureRazorpayLoaded();
      openRazorpay(order);
    } catch (err) {
      setError(err.message || "Payment could not be started.");
      setStatus("Payment setup failed.");
    }
  }

  function parseStoredJson(value) {
    if (!value) return undefined;
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  async function safeJson(response) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  function ensureRazorpayLoaded() {
    if (window.Razorpay) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Razorpay SDK failed to load.")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = RAZORPAY_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
      document.body.appendChild(script);
    });
  }

  function openRazorpay(order) {
    const razorpayKey = process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      setError("Razorpay key is missing. Please configure NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID.");
      setStatus("Payment setup failed.");
      return;
    }

    if (!window.Razorpay) {
      setError("Razorpay SDK is not available. Please refresh and try again.");
      setStatus("Payment setup failed.");
      return;
    }

    setStatus("Opening Razorpay checkout...");

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "QCS LinkedIn AI Scanner",
      description: "₹49 LinkedIn Profile Rewrite to 100% QCS Score",
      order_id: order.id,

      handler: async function (response) {
        await verifyPayment(response);
      },

      modal: {
        ondismiss: () => {
          setStatus("Payment cancelled.");
        },
      },

      theme: {
        color: "#0A66C2",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  async function verifyPayment(response) {
    try {
      setStatus("Verifying payment...");

      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data = await safeJson(res);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Payment verification failed.");
      }

      localStorage.setItem("linkedin_rewrite_paid", "true");
      setStatus("Payment verified. Redirecting...");
      router.push("/suggestions");
    } catch (err) {
      setError(err.message || "Payment verification failed.");
      setStatus("Payment verification failed.");
    }
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="text-center" style={{ maxWidth: 520 }}>
        <h1 className="mb-3">QCS Secure Payment</h1>
        <p className="mb-3">{status}</p>
        {error && <p className="text-danger mb-3">{error}</p>}
        {error && (
          <button className="cs_btn cs_style_1" onClick={startPayment}>
            <span>Try Again</span>
          </button>
        )}
      </div>
    </main>
  );
}
