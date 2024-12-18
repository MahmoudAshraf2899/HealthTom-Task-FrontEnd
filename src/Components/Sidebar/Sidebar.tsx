import { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModule } from "../../redux/Slices/SidebarSlice";
import { useMediaQuery } from "react-responsive";
import { Visits } from "../Visits/Visits";

export const Sidebar = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();

  return (
    <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
      <aside className="sidebar-sticky sidebar justify-start">
        <section className="sidebar-title items-center p-4">
          <img
            src="https://healthtom.com/wp-content/uploads/2024/09/HealthTOM-Logo.png"
            alt="logo"
          />
        </section>
        <section className="sidebar-content min-h-[20rem]">
          <nav className="menu rounded-md">
            <section className="menu-section px-4">
              <span className="menu-title">Main menu</span>
              <ul className="menu-items">
                <Link to="/Visits">
                  <li className="menu-item menu-active">
                    <svg
                      className="h-5 w-5 opacity-75"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 55.08 55.08"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M47.748,23.991H31.651c-0.475,0-0.858,0.384-0.858,0.857v10.66c0,0.473,0.384,0.858,0.858,0.858 h16.097c0.474,0,0.858-0.386,0.858-0.858v-10.66C48.606,24.375,48.221,23.991,47.748,23.991z M46.889,34.649H32.51v-8.941h14.379 C46.889,25.708,46.889,34.649,46.889,34.649z"></path>{" "}
                            <path d="M27.386,26.644c-0.246-0.004-0.441,0.163-0.458,0.399c-0.059,0.881-1.164,1.404-1.817,1.639 c-3.116,1.116-8.7,0.528-10.963-1.875c-0.959-1.021-2.054-1.522-3.272-1.479c-2.623,0.086-4.792,2.677-4.883,2.786 c-0.151,0.184-0.125,0.452,0.057,0.604c0.183,0.15,0.455,0.125,0.605-0.057c0.02-0.024,2.01-2.401,4.25-2.475 c0.949-0.029,1.835,0.376,2.618,1.208c1.705,1.811,4.975,2.693,7.973,2.692c1.43,0,2.798-0.202,3.905-0.598 c1.883-0.674,2.336-1.671,2.384-2.389C27.801,26.864,27.623,26.659,27.386,26.644z"></path>{" "}
                            <path d="M27.386,32.923c-0.246-0.011-0.441,0.164-0.458,0.4c-0.059,0.881-1.164,1.404-1.817,1.638 c-3.116,1.118-8.7,0.528-10.963-1.875c-0.959-1.019-2.054-1.521-3.272-1.476c-2.623,0.084-4.792,2.674-4.883,2.783 c-0.151,0.184-0.125,0.453,0.057,0.605c0.183,0.15,0.455,0.125,0.605-0.059c0.02-0.023,2.01-2.4,4.25-2.474 c0.949-0.031,1.835,0.375,2.618,1.207c1.705,1.812,4.975,2.693,7.973,2.693c1.43,0,2.798-0.202,3.905-0.598 c1.883-0.674,2.336-1.671,2.384-2.39C27.801,33.144,27.623,32.939,27.386,32.923z"></path>{" "}
                            <path d="M2.378,49.118h50.324c1.311,0,2.378-1.066,2.378-2.377V15.728c0-1.312-1.067-2.378-2.378-2.378 H32.734V8.339c0-1.399-0.769-2.377-1.869-2.377h-6.649c-1.101,0-1.869,0.977-1.869,2.377v5.011H2.378 C1.067,13.35,0,14.416,0,15.728v31.014C0,48.052,1.067,49.118,2.378,49.118z M25.352,8.962h4.381l-0.005,4.388h-4.381 L25.352,8.962z M3,16.35h21.215h6.649H52.08v29.768H3V16.35z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <span>Visits</span>
                  </li>
                </Link>
              </ul>
            </section>
          </nav>
        </section>
        <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
          <div className="divider my-0"></div>

          <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0">
            <div className="flex flex-row gap-4 p-4">
              <div className="flex flex-col">
                <button
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg cursor"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/Login");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </label>
        </section>
      </aside>
      <div className="flex w-full flex-row flex-wrap gap-4 p-6">
        <div className="my-4  w-full gap-4">
          <Visits />
        </div>
      </div>
    </div>
  );
};
