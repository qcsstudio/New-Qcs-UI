'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  // useEffect(() => {
  //   startPayment();
  // }, []);
  useEffect(() => {
  const timer = setTimeout(() => {
    startPayment();
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  async function startPayment() {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("payment_return_path", "/payment");
      router.push("/login");
      return;
    }

    const service = localStorage.getItem("linkedin_paid_service") || "profile-rewrite-100-score";
    const amount = Number(localStorage.getItem("linkedin_paid_amount") || 49);
    const auditScore = localStorage.getItem("linkedin_audit_score");
    const linkedinUrl = localStorage.getItem("linkedin_audit_url");
    const role = localStorage.getItem("linkedin_audit_role");
    const auditReport = parseStoredJson(localStorage.getItem("linkedin_audit_report"));

    // 🟢 Step 1: Create ₹49 Razorpay Order for the profile rewrite service
    const res = await fetch("https://analyzer.qcsstudio.com/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
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

    const data = await res.json();
    console.log("Order data:", data);

    if (!data || !data.order) {
  alert("Order create failed");
  return;
}

    openRazorpay(data.order, token);
  }

  function parseStoredJson(value) {
    if (!value) return undefined;
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  function openRazorpay(order, token) {
      console.log("Checking Razorpay SDK...");
   if (!window.Razorpay) {
    console.log("Razorpay SDK not loaded yet");
    setTimeout(() => openRazorpay(order, token), 500);
    return;
  }

    const options = {
      key: process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "QCS LinkedIn AI Scanner",
      description: "₹49 LinkedIn Profile Rewrite to 100% QCS Score",
      order_id: order.id,

      handler: async function (response) {
        await verifyPayment(response, token);
      },

      modal: {
        ondismiss: () => {
          alert("Payment cancelled");
        }
      },

      theme: {
        color: "#0A66C2"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }


  async function verifyPayment(response, token) {
    const res = await fetch("https://analyzer.qcsstudio.com/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("linkedin_rewrite_paid", "true");
      router.push("/suggestions");
    }
  }

  return (
    // <p>Redirecting to payment...</p>
    <>
    </>
  );
}
