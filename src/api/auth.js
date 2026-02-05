import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const activateAccount = (token) =>
  api.get(`/auth/activate/${token}`);

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) => {
  return api.post(`/auth/reset-password/${token}`, {
    password: password,
  });
};
