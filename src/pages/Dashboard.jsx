import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DriveToolbar from "../components/DriveToolbar";
import DriveItemCard from "../components/DriveItemCard";
import DragDropZone from "../components/DragDropZone";
import { getDriveItems } from "../api/drive";

export default function Dashboard() {
  const navigate = useNavigate();
  const { folderId } = useParams(); // URL-based folder navigation

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // 🔹 Fetch items for current folder (or root)
  const fetchItems = async (parentFolderId = null) => {
    try {
      setLoading(true);
      const res = await getDriveItems(parentFolderId);

      // ✅ ensure items is ALWAYS an array
      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else if (Array.isArray(res.data.items)) {
        setItems(res.data.items);
      } else {
        setItems([]);
      }

    } catch (err) {
      console.error("Failed to load drive items", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Sync UI with URL (BACK / FORWARD / REFRESH SAFE)
  useEffect(() => {
    if (!folderId) {
      // Root
      setCurrentFolder(null);
      setBreadcrumbs([]);
      fetchItems(null);
    } else {
      // Folder from URL
      fetchItems(folderId);
    }
  }, [folderId]);

  // 🔹 Open folder → update URL (browser history aware)
  const openFolder = (folder) => {
    navigate(`/dashboard/folder/${folder._id}`);
  };

  // 🔹 Breadcrumb navigation
  const goToBreadcrumb = (index) => {
    if (index < 0) {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/folder/${breadcrumbs[index]._id}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border w-full max-w-6xl">

      {/* 🔹 Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        My Drive
      </h2>

      {/* 🔹 Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          Root
        </span>

        {breadcrumbs.map((folder, index) => (
          <span key={folder._id} className="flex gap-1">
            /
            <span
              className="cursor-pointer hover:underline"
              onClick={() => goToBreadcrumb(index)}
            >
              {folder.name}
            </span>
          </span>
        ))}
      </div>

      <DragDropZone
        onUpload={() => fetchItems(folderId || null)}
        currentFolderId={folderId || null}
      />

      <DriveToolbar
        onRefresh={() => fetchItems(folderId || null)}
        currentFolderId={folderId || null}
      />

      {/* 🔹 Content */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No files or folders</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <DriveItemCard
              key={item._id}
              item={item}
              onFolderClick={openFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
