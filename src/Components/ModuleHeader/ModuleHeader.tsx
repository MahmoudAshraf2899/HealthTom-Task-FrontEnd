import "./ModuleHeader.scss";
import { useLocation } from "react-router-dom";

export const ModuleHeader = () => {
  const location = useLocation();

  return <div className="ModuleHeader"></div>;
};
