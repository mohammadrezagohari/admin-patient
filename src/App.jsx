import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Dashboard, Auth } from "@/layouts";
import SendOtp from "./pages/auth/send-otp";
import { AuthContext, AuthProvider } from "./gard/context/AuthContext";
import { SignIn } from "./pages/auth";
import EditUser from "./pages/dashboard/users/editUser";
import ShowCities from "./pages/dashboard/province/showCities";
import ShowCity from "./pages/dashboard/city/showCity";
import CreateCity from "./pages/dashboard/city/createCity";
import CreateCategory from "./pages/dashboard/category/createCategory";
import ShowCategory from "./pages/dashboard/category/showCategory";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import UserPanel from "./pages/dashboard/users/panel";
// import CreateContact from "./pages/dashboard/contact/createContact";
// import CreateAboutUs from "./pages/dashboard/about/createAbout";
import { Profile, Users } from "./pages/dashboard";
import { useContext } from "react";
import Tutorials from "./pages/dashboard/tutorials/tutorials";
import CreateTutorials from "./pages/dashboard/tutorials/createTutorials";
import DashboardBody from "./pages/dashboard/DashboardBody/DashboardBody";
import Category from "./pages/dashboard/category/category";

function App() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
    useContext(AuthContext);
  if (!userToken) {
    return (
      <Routes>
        <Route path="/*" element={<SignIn />} />
      </Routes>
    );
  } else {
    return (
      <>
        <Dashboard>
          <Routes>
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/sendOtpCode/*" element={<SendOtp />} />
            <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
            <Route path="/dashboard/profile/profile" element={<Profile />} />
            <Route path="/dashboard/tutorials" element={<Tutorials />} />
            <Route path="/dashboard/users/panel/:id" element={<UserPanel />} />
            {/* 
            <Route path="/dashboard/grades/" element={<Grade />} />
            <Route path="/dashboard/grades/create" element={<CreateGrade />} />
            <Route path="/dashboard/grades/show/:id" element={<ShowGrade />} /> */}

            {/* <Route
              path="/dashboard/contact/create"
              element={<CreateContact />}
            />

            <Route path="/dashboard/about/create" element={<CreateAboutUs />} /> */}

            <Route path="/dashboard/categories" element={<Category />} />
            <Route
              path="/dashboard/category/create"
              element={<CreateCategory />}
            />
            <Route
              path="/dashboard/category/show/:id"
              element={<ShowCategory />}
            />

            {/* <Route
                path="/dashboard/province/create"
                element={<CreateProvince />}
              />
              <Route
                path="/dashboard/province/show/:id"
                element={<ShowProvince />}
              /> */}
            <Route
              path="/dashboard/province/:id/cities/show"
              element={<ShowCities />}
            />
            <Route path="/dashboard/city/create/:id" element={<CreateCity />} />
            <Route
              path="/dashboard/province/:province_id/city/show/:city_id"
              element={<ShowCity />}
            />
            <Route
              path="/dashboard/Tutorials/create"
              element={<CreateTutorials />}
            />
            <Route path="/dashboard/dashboard" element={<DashboardBody />} />
            <Route path="/" element={<DashboardBody />} />
          </Routes>
        </Dashboard>
      </>
    );
  }
}

export default App;
