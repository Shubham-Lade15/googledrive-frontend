import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(email);
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Email not found ❌"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      <p className="text-gray-600 mb-4">
        Enter your registered email to receive a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
