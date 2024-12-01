import React, { useEffect } from "react";
import { Login } from "./Components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Views } from "./app-layout/Views";
function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      {token != null ? (
        <>
          <Views />
          <ToastContainer rtl />
        </>
      ) : (
        <>
          <Login />
          <ToastContainer rtl />
        </>
      )}
    </div>
  );
}

export default App;
