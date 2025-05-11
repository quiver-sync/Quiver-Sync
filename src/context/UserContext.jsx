import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setUser({
          id: res.data._id,
          username: res.data.username,
          status: res.data.status,
          picture: res.data.picture,
        });
      } catch (err) {
          try {
            const refresh = await axios.post("/auth/refresh"); 
            console.log("🔁 Refreshed access token");
  
            // try profile again
            const res = await axios.get("/auth/profile");
            console.log("first")
            setUser({
              id: res.data._id,
              username: res.data.username,
              status: res.data.status,
              picture: res.data.picture,
            });
          } catch (refreshErr) {
            console.warn("⚠️ Refresh failed:", refreshErr.message);
            setUser(null);
          }
      }
    };
  
    checkAuth();
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
