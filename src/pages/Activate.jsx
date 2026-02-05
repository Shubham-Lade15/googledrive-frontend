import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { activateAccount } from "../api/auth";

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await activateAccount(token);
        setStatus("success");
        setMessage(res.data.message);
        toast.success("Account activated successfully ✅");
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Activation failed ❌"
        );
        toast.error("Activation failed ❌");
      }
    };

    activateUser();
  }, [token]);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">
      {status === "loading" && (
        <p className="text-gray-600">Activating your account...</p>
      )}

      {status === "success" && (
        <>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Account Activated 🎉
          </h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Activation Failed ❌
          </h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Register Again
          </button>
        </>
      )}
    </div>
  );
}
