import React, { useState } from "react";
import instance from "../data/instance"; // Ensure this is the correct path to your Axios instance

export default function useSubmitData() {
  const [loading, setLoading] = useState(false); // Indicates if the submission is in progress
  const [success, setSuccess] = useState(false); // Indicates if the submission was successful
  const [isErr, setIsErr] = useState(false); // Indicates if there was an error during submission
  const [err, setErr] = useState(""); // Holds the error message
  const [sendStat, setSendStat] = useState(false); // Indicates if data was sent successfully

  const handleSubmit = async (url, payload) => {
    setLoading(true);
    setIsErr(false); // Reset error state before new submission
    setErr(""); // Clear previous error message

    try {
      const response = await instance({
        url: `${url}`,
        method: "POST",
        data: payload,
      });

      setSuccess(true);
      setSendStat(true); // Mark as successfully sent
      setTimeout(() => {
        setSuccess(false);
        setSendStat(false); // Reset send status after timeout
      }, 5000);

      return response.data; // Return response data if needed
    } catch (e) {
      // Handle errors gracefully
      const errorMessage = e.response?.data?.message || "An error occurred. Please try again.";
      setErr(errorMessage);
      setIsErr(true);
      console.error("Error during submission:", errorMessage); // Log the error for debugging
    } finally {
      setLoading(false); // Ensure loading state is reset regardless of success or failure
    }
  };

  return [handleSubmit, loading, success, isErr, err, sendStat];
}