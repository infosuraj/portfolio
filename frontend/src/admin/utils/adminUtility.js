const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const IMAGEKIT_PUBLIC_API_KEY = process.env.REACT_APP_IMAGEKIT_PUBLIC_API_KEY;
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export const handleFileUpload = async (file, folder) => {
  try {
    const authUrl = process.env.REACT_APP_API_BASE_URL;

    const authRes = await fetch(`${authUrl}/uploads/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Only for backend auth
      },
    });

    const { signature, token, expire } = await authRes.json();

    if (!signature || !token || !expire) {
      throw new Error("Invalid auth response from server");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", process.env.REACT_APP_IMAGEKIT_PUBLIC_API_KEY);
    formData.append("signature", signature);
    formData.append("token", token);
    formData.append("expire", expire);

    if (folder) {
      formData.append("folder", `/${folder}`);
    }

    const response = await fetch(IMAGEKIT_UPLOAD_URL, {
      method: "POST",
      body: formData, // ✅ No headers here
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "ImageKit upload failed");
    }

    return result.url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};



export const loginRequest = async (username, password) => {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const fetchData = async (endpoint, token) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    const errData = await response.json();
    const error = new Error(errData.message || `Failed to fetch ${endpoint}`);
    // Add a custom property to the error object to identify auth issues
    if (response.status === 401 && (errData.message.includes("Token expired") || errData.message.includes("Session expired") || errData.message.includes("Token missing"))) {
        error.isAuthError = true;
    }
    throw error;
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const saveData = async (endpoint, data, token, id) => {
  const isEditing = !!id;
  const url = isEditing ? `${BASE_URL}/${endpoint}/${id}` : `${BASE_URL}/${endpoint}`;
  const method = isEditing ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message || 'Failed to save');
    // Add a custom property to the error object to identify auth issues
    if (response.status === 401 && (result.message.includes("Token expired") || result.message.includes("Session expired") || result.message.includes("Token missing"))) {
        error.isAuthError = true;
    }
    throw error;
  }
  return result;
};

export const deleteData = async (endpoint, id, token) => {
  const url = id ? `${BASE_URL}/${endpoint}/${id}` : `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    const result = await response.json();
    const error = new Error(result.message || 'Failed to delete');
    // Add a custom property to the error object to identify auth issues
    if (response.status === 401 && (result.message.includes("Token expired") || result.message.includes("Session expired") || result.message.includes("Token missing"))) {
        error.isAuthError = true;
    }
    throw error;
  }
  return true;
};