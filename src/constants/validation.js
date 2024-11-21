import { jwtDecode } from "jwt-decode";

export const extractIdFromToken = () => {
  const token = localStorage.getItem("readerlyJWTstorageitem");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token); 
    const id = decoded.sub; 
    return id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

