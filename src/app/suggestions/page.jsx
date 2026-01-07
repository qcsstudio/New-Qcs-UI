"use client";
import { useEffect, useState } from "react";
import LinkedInProfileHeader from "../../components/suggestion/LinkedInProfileHeader/LinkedInProfileHeader";
import ExperienceSection from "../../components/suggestion/ExperienceSection";

export default function Suggestions() {
  const [resData, setResData] = useState(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.log(" Token not found in localStorage");
          return;
        }

        // API call
        const response = await fetch(
          "https://analyzer.qcsstudio.com/api/analyze/suggestions",
          {
            method: "POST", // API POST expect karti hai
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error===>:", response.status, errorText);
          return;
        }

        const data = await response.json();
        setResData(data);

        console.log("✅ API Response:", data);

      } catch (error) {
        console.error(" Network / JS Error:", error);
      }
    };

    fetchSuggestions();
  }, []);

 return (
  <>
  <LinkedInProfileHeader data={resData}/>
  {/* <ExperienceSection data={resData}/> */}
  </>
  );

}
