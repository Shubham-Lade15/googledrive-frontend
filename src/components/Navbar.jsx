import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600 tracking-tight">
        Google Drive
      </h1>


      {!token ? (
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
