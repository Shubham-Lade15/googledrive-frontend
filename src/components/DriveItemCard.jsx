import { downloadFile } from "../api/drive";
import toast from "react-hot-toast";

export default function DriveItemCard({ item, onFolderClick }) {
  const handleClick = async () => {
    if (item.type === "folder") {
      onFolderClick(item);
      return;
    }

    try {
      const res = await downloadFile(item._id);
      window.open(res.data.url, "_blank");
    } catch (err) {
      toast.error("Download failed ❌");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group border border-gray-200 rounded-xl p-4 cursor-pointer bg-white hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-2 font-medium text-gray-800">
        <span className="text-xl">
          {item.type === "folder" ? "📁" : "📄"}
        </span>
        <span className="truncate">{item.name}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1 capitalize">
        {item.type}
      </div>
    </div>
  );
}
