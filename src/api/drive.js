import api from "./axios";

// get folders & files
export const getDriveItems = (parentId = null) =>
  api.get("/drive/list", {
    params: { parentId },
  });

// create folder
export const createFolder = (data) =>
  api.post("/drive/folder", data);

// upload file
export const uploadFile = (formData, parentId) =>
  api.post("/drive/upload", formData, {
    params: { parentId },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const downloadFile = (fileId) =>
  api.get(`/drive/download/${fileId}`);
