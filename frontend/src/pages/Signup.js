import React, { useState } from "react";
import { signup } from "../api/auth";

function Signup({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const data = await signup(username, password);
    if (data.ok) {
      setMessage("Signup successful! You can now login.");
    } else {
      setMessage(data.error || "Signup failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-2"
      />
      <button
        onClick={handleSignup}
        className="w-full bg-primary text-white p-2 rounded"
      >
        Sign Up
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default Signup;
