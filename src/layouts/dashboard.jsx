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
import { useRef } from "react";
import { useState } from "react";
// import { AuthProvider } from "@/gard/context/AuthContext";
// import { useLocalStorage } from "@/gard/storage/useLocalStorage"; 

export function Dashboard({ children }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType , openSidenav} = controller;
  const hamergurMenuRef=useRef();
  const [isShow,setIsShow] = useState(false);
  // const { userToken } = useContext(AuthContext);
  const showMenuHandler=()=>{
    setIsShow(prev=>!prev);
    console.log('is hsow: ',isShow);
  }
  // const logOut= (userToken)=>{
  //   localStorage.removeItem(userToken);
  //   // Perform logout logic
  //   setIsLoggedIn(false);
  
  // }

  return (

      <>
        <div className="flex ">
          <div  onClick={showMenuHandler} style={{borderRadius:'8px'}} className=" w-10 h-10  absolute top-4 right-8 cursor-pointer z-50 flex justify-center items-center bg-themeclr1 lg:hidden md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6797 18.9751L8 18.9981" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.6875 5.76758H12.9916" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.6797 12.2549H4.31969" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div  style={{borderRadius:'8px'}} className=" p-2 w-max h-10 text-white  absolute top-4 left-8 cursor-pointer z-50 flex justify-center items-center bg-themeclr1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="w-5 h-5 text-inherit">
            <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
          </svg>
          خروج
          </div>
          <div className="w-10 h-10 bg-blue-gray-800 lg:hidden md:hidden">
            <img src="/img/لوگو دانشگاه 1.png" width="50" alt="menu icon"/>
          </div>
          <Sidenav isShow={isShow}
          ref={hamergurMenuRef}
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/لوگو دانشگاه 1.png"
                : "/img/pelogo.png"
            }
          />
          <div className={`lg:w-[70%] w-full h-screen p-4 overflow-scroll absolute left-0 `}>
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
