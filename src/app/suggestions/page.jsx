"use client";
import { useEffect } from "react";

export default function Suggestions() {
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // 1️⃣ localStorage se token lo
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("❌ Token not found in localStorage");
          return;
        }

        // 2️⃣ API call
        const response = await fetch(
          "http://13.127.109.214:5000/api/analyze/suggestions",
          {
            method: "POST", // API POST expect karti hai
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // 🔴 status check (VERY IMPORTANT)
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);
          return;
        }

        // 3️⃣ response json me convert
        const data = await response.json();

        // 4️⃣ console me response dikhao
        console.log("✅ API Response:", data);

      } catch (error) {
        console.error(" Network / JS Error:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return <div>Suggestions</div>;
}
