'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    startPayment();
  }, []);

  async function startPayment() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // 🟢 Step 1: Create Order
    const res = await fetch("http://13.127.109.214:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: 49 })
    });

    const data = await res.json();
    console.log("Order data:", data);

    openRazorpay(data.order, token);
  }

  function openRazorpay(order, token) {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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

  async function verifyPayment(response, token) {
    const res = await fetch("http://13.127.109.214:5000/api/payment/verify", {
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
