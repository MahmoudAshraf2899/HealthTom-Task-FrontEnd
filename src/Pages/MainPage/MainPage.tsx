import { Sidebar } from "../../Components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import "./MainPage.scss";

import API from "../../Api";
import { Loading } from "../../Components/Loading/Loading";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [dispatch]);

  return (
    <div className="">
      {isLoading === true ? <Loading /> : null}

      <div className="w-full">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        {/* Side bar*/}
        <Sidebar />
      </div>
    </div>
  );
};
