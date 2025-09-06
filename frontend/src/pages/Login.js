import React, { useState } from "react";
import { login } from "../api/auth";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token); // store JWT
      setMessage("Login successful!");
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="w-full bg-primary text-white p-2 rounded"
      >
        Login
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default Login;
