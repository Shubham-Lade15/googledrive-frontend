import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );
      return;
    }

    try {
      console.log("Sending password:", password);

      const res = await resetPassword(token, password);
      toast.success(res.data.message);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Reset failed ❌"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
