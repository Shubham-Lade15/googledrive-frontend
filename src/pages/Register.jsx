import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PASSWORD_REGEX.test(formData.password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );
      return;
    }

    try {
      const res = await registerUser(formData);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed ❌"
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="firstName"
          placeholder="First Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="username"
          placeholder="Username (or use email)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password (Eg: Pass@1234)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already a user?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

      </form>
    </div>
  );
}
