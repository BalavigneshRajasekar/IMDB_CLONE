/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../../axiosConfig";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/user/create", values);
      return response.data;
    } catch (e) {
      console.log(e);

      throw new Error(e.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <authContext.Provider value={{ user, signUp, loading }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthProvider;
