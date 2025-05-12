import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

function useAuth() {
  return useContext(authContext);
}

export default useAuth;
