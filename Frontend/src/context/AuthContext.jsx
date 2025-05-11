/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { createContext } from "react";

const authContext = createContext();

const authProvider = ({ children }) => {
  const [user, SetUser] = useState(null);

  const login = () => {
    // try {
    // } catch (e) {}
  };
  return (
    <>
      <authContext.Provider value={user}></authContext.Provider>
    </>
  );
};

export default authProvider;
