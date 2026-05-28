import React from "react";
import Login from "../pages/Login/Login"; // ← Apne folder structure ke hisab se path check kar lein

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  if (!token || !loginTime || token === "undefined" || loginTime === "undefined") {
    return <Login />;
  }

  // 2. 1 Minute ki expiry check (1 minute = 60000 ms)
  const ONE_MINUTE = 60 * 1000; 
  const currentTime = Date.now();
  const timePassed = currentTime - Number(loginTime);

  // 3. Agar 1 minute khatam ho gaya hai, toh storage clear karke LOGIN form dikhao
  if (timePassed > ONE_MINUTE) {
    localStorage.clear();
    return <Login />;
  }

  return children;
}