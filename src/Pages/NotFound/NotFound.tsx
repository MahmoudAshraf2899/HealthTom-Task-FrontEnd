import { Sidebar } from "../../Components/Sidebar/Sidebar";

import notFound from "../../Assets/Icons/notfound.jpg";
export const NotFound = () => {
  return (
    <div className="flex flex-row " style={{ direction: "rtl" }}>
      <div className="sm:w-full sm:max-w-[18rem]">
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
      <div className="flex w-full flex-col p-4 bg-white">
        <div className="page-container" style={{ backgroundColor: "#FFF" }}>
          <div className="col-span-12 row-span-1"></div>
        </div>
        {/* Content Will Be Here */}

        <>
          <div
            className="h-full flex justify-center"
            style={{ backgroundColor: "var(--Greyscale-50, #F8FAFC)" }}
          ></div>
        </>
      </div>
    </div>
  );
};
