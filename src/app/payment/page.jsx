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
      router.push("/login");
      return;
    }

    // 🟢 Step 1: Create Order
    const res = await fetch("https://analyzer.qcsstudio.com/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const data = await res.json();
    console.log("Order data:", data);

    if (!data || !data.order) {
  alert("Order create failed");
  return;
}

    openRazorpay(data.order, token);
  }

  function openRazorpay(order, token) {
      console.log("Checking Razorpay SDK...");
   if (!window.Razorpay) {
    console.log("Razorpay SDK not loaded yet");
    setTimeout(() => openRazorpay(order, token), 500);
    return;
  }

  console.log("Using Key:", process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID);
    const options = {
      key: process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "QCS LinkedIn AI Scanner",
      description: "Unlock LinkedIn Suggestions",
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
  console.log("RAZORPAY KEY:", process.env.NEXT_PUBLIC_LIVE_RAZORPAY_KEY_ID);


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
      router.push("/suggestions");
    }
  }

  return (
    // <p>Redirecting to payment...</p>
    <>
    </>
  );
}
