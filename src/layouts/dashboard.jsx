import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer, 
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard({children}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType , openSidenav} = controller;

  return (

      <>
        <div className="flex bg-blue-gray-900 ">
          <div className="w-10 h-10 bg-blue-gray-800 lg:hidden md:hidden">
            <img src="/img/لوگو دانشگاه 1.png" width="50" alt="menu icon"/>
          </div>
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/لوگو دانشگاه 1.png"
                : "/img/pelogo.png"
            }
          />
          <div className={`w-full p-4 bg-white `}>
            {children}
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    </>
    
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;