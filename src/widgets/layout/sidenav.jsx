import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState } from "react";
import {
  ArrowDownIcon,
  FolderArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowSmallDownIcon,
  InboxArrowDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export function Sidenav({ brandImg, brandName, routes }) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const styleAside = {
    overflowY: "scroll",
  };
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "translate-x-80"
      } fixed inset-0 z-50 ml-4  h-full w-72 rounded-l-xl transition-transform duration-300 lg:my-4 lg:h-[calc(100vh-32px)] lg:rounded-xl xl:translate-x-0`}
      style={styleAside}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}

            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "پنل مدیریت",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;

//----------------------------------------------------------------

// {pages.map(({ icon, name, path, childrens }) => (
//   <li
//     key={name}
//     className={` ${childrens ? "bg-deep-orange-900" : ""}`}
//   >
//     {childrens ? (<>
//       <NavLink
//       onClick={childrens ? showSubnav : ""}
//       >
//       {({ isActive }) => (
//         <Button
//           // variant={isActive ? "gradient" : "text"}
//           // color={
//           //   isActive
//           //     ? sidenavColor
//           //     : sidenavType === "dark"
//           //     ? "white"
//           //     : "blue-gray"
//           // }
//           className="flex items-center justify-between gap-4 px-4 capitalize"
//           fullWidth
//         >
//           <span  className="flex items-center gap-4">

//           {icon}
//           <Typography
//             color="inherit"
//             className="font-medium capitalize"
//           >
//             {name}
//           </Typography>
//           </span>
//           {childrens ? (<span>
//             <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
//           </span>) : (<>

//           </>) }
//         </Button>
//       )}
//     </NavLink>
//     </>) : (<>

//     <NavLink
//       onClick={childrens ? showSubnav : ""}
//       to={`/${layout}${path}`}
//     >
//       {({ isActive }) => (
//         <Button
//           variant={isActive ? "gradient" : "text"}
//           color={
//             isActive
//               ? sidenavColor
//               : sidenavType === "dark"
//               ? "white"
//               : "blue-gray"
//           }
//           className="flex items-center justify-between gap-4 px-4 capitalize"
//           fullWidth
//         >
//           <span  className="flex items-center gap-4">

//           {icon}
//           <Typography
//             color="inherit"
//             className="font-medium capitalize"
//           >
//             {name}
//           </Typography>
//           </span>
//           {childrens ? (<span>
//             <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
//           </span>) : (<>

//           </>) }
//         </Button>
//       )}
//     </NavLink>
//     </>)}
//     {childrens?.map(({ name, path }) => (
//       <div key={name} >
//         {subnav ? (
//           <NavLink key={name} to={`/${layout}${path}`}>
//             {({ isActive }) => (
//               <Button
//                 variant={isActive ? "gradient" : "text"}
//                 color={
//                   isActive
//                     ? sidenavColor
//                     : sidenavType === "dark"
//                     ? "white"
//                     : "blue-gray"
//                 }
//                 className="flex items-center gap-4 px-12 capitalize"
//                 fullWidth
//               >
//                 <Typography
//                   color="inherit"
//                   className="font-medium capitalize"
//                 >
//                  {name}
//                 </Typography>
//               </Button>
//             )}
//           </NavLink>
//         ) : (
//           <></>
//         )}
//       </div>
//     ))}
//   </li>
// ))}
