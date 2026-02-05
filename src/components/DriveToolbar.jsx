import { useRef, useState } from "react";
import { createFolder, uploadFile } from "../api/drive";
import toast from "react-hot-toast";

export default function DriveToolbar({ onRefresh, currentFolderId }) {
  const [showInput, setShowInput] = useState(false);
  const [folderName, setFolderName] = useState("");

  const fileInputRef = useRef(null);

  // create folder
  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;

    try {
      await createFolder({
        name: folderName,
        parentId: currentFolderId || null,
      });
      toast.success("Folder created successfully ✅");
      setFolderName("");
      setShowInput(false);
      onRefresh();
    } catch (err) {
      toast.error("Failed to create folder ❌");
    }
  };

  // trigger file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // upload file
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(
        formData,
        currentFolderId || null
      );
      onRefresh(); // reload items
    } catch (err) {
      alert("File upload failed ❌");
    } finally {
      e.target.value = ""; // reset input
    }
  };

  return (
    <div className="flex gap-4 mb-4 items-center flex-wrap">
      {/* New Folder */}
      <button
        onClick={() => setShowInput(!showInput)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        + New Folder
      </button>

      {/* Upload File */}
      <button
        onClick={handleUploadClick}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
      >
        Upload File
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      {showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            className="border p-2 rounded"
          />
          <button
            onClick={handleCreateFolder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}
