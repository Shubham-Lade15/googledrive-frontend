import { useRef } from "react";
import { uploadFile } from "../api/drive";
import toast from "react-hot-toast";

export default function DragDropZone({ onUpload, currentFolderId }) {
  const fileInputRef = useRef(null);

  // 🔹 Click → open file picker
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // 🔹 Handle drag drop
  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    await upload(file);
  };

  // 🔹 Handle manual select
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await upload(file);
    e.target.value = "";
  };

  // 🔹 Upload logic (single source of truth)
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(
        formData,
        currentFolderId || null
      );
      toast.success("File uploaded successfully ✅");
      onUpload();
    } catch (err) {
      console.error(err);
      toast.error("File upload failed ❌");
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 mb-6 bg-gray-50 hover:border-blue-400 transition cursor-pointer"
    >
      <p className="font-medium">
        Drag & drop files here
      </p>
      <p className="text-sm text-gray-400 mt-1">
        or click to select files
      </p>

      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}
