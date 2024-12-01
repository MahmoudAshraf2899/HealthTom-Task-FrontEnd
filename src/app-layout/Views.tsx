import { Login } from "../Components/Login/Login";
import { AddVisit } from "../Components/Visits/Add/Add";

import { MainPage } from "../Pages/MainPage/MainPage";

import { AuthProvider, useAuth } from "./auth";
import { Route, Routes } from "react-router-dom";

export const Views = () => {
  const auth = useAuth();
  return (
    <AuthProvider>
      <Routes>
        {!auth?.user && <Route path="/login" element={<Login />} />}
        <Route path="/Visits" element={<MainPage />} />
        <Route path="/Visits/AddVisit" element={<AddVisit />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};
