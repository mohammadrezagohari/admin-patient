import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { AuthContext, AuthProvider } from "./gard/context/AuthContext";
import { SignIn } from "./pages/auth";
import EditUser from "./pages/dashboard/users/editUser";
import ShowCities from "./pages/dashboard/province/showCities";
import ShowCity from "./pages/dashboard/city/showCity";
import CreateCity from "./pages/dashboard/city/createCity";
import CreateCategory from "./pages/dashboard/category/createCategory";
import ShowCategory from "./pages/dashboard/category/showCategory";

import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import UserPanel from "./pages/dashboard/users/panel";
// import CreateContact from "./pages/dashboard/contact/createContact";
import CreateAboutUs from "./pages/dashboard/about/createAbout";
import { Profile, Users } from "./pages/dashboard";
import { useContext } from "react";
import CreateTutorials from "./pages/dashboard/tutorials/create-tutorials";
import Category from "./pages/dashboard/category/category";
import Tutorials from "./pages/dashboard/Tutorials/Tutorials";
import EducationCovers from "./pages/dashboard/poster/poster";
import CreateEducationCover, { CreatePoster } from "./pages/dashboard/poster/createPoster";
import SystemBenefit from "./pages/dashboard/systemBenefit/systemBenefit";
import CreateSystemBenefit from "./pages/dashboard/systemBenefit/createSystemBenefit";
import PatientContent from "./pages/dashboard/patientContent/patientContent";
import CreatePatientContent from "./pages/dashboard/patientContent/createPatientContent";
import Questions from "./pages/dashboard/faq/faq";
import CreateQuestions, { CreateFaq } from "./pages/dashboard/faq/createFaq";
import Faq from "./pages/dashboard/faq/faq";
import ShowFaq from "./pages/dashboard/faq/showFaq";
import Home from "./pages/dashboard/home";
import SystemGoal from "./pages/dashboard/systemGoal/sysGoal";
import CreateSystemGoal from "./pages/dashboard/systemGoal/createSysGoal";
import ShowSystemGoals from "./pages/dashboard/systemGoal/showSystemGoal";
import Poster from "./pages/dashboard/poster/poster";

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
            <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
            <Route path="/dashboard/profile/profile" element={<Profile />} />
            <Route path="/dashboard/tutorials" element={<Tutorials />} />
            <Route path="/dashboard/users/panel/:id" element={<UserPanel />} />

            {/* <Route path="/dashboard/about/create" element={<CreateAboutUs />} />  */}

            <Route path="/dashboard/categories" element={<Category />} />
            <Route
              path="/dashboard/category/create"
              element={<CreateCategory />}
            />
            <Route
              path="/dashboard/category/show/:id"
              element={<ShowCategory />}
            />

            <Route
              path="/dashboard/patientcontent"
              element={<PatientContent />}
            />
            <Route
              path="/dashboard/patientcontent/create"
              element={<CreatePatientContent />}
            />

            <Route path="/dashboard/systemgoal" element={<SystemGoal />} />
            <Route
              path="/dashboard/systemgoal/create"
              element={<CreateSystemGoal />}
            />
            <Route
              path="/dashboard/systemgoal/show/${goal.id}"
              element={<ShowSystemGoals />}
            />

            <Route path="/dashboard/faq" element={<Faq />} />
            <Route path="/dashboard/faq/create" element={<CreateFaq />} />
            <Route path="/dashboard/faq/show/:id" element={<ShowFaq />} />
            {/* <Route path="/dashboard/home" element={<Home />} /> */}

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
              path="/dashboard/tutorials/create"
              element={<CreateTutorials />}
            />
            <Route path="/dashboard/dashboard" element={<Home />} />
            <Route path="/dashboard/poster/create" element={<CreatePoster />} />
            <Route path="/dashboard/poster" element={<Poster />} />
            <Route path="/dashboard/systemBenefit" element={<SystemBenefit />} />
            <Route path="/dashboard/systemBenefit/create" element={<CreateSystemBenefit />} />

          </Routes>
        </Dashboard>
      </>
    );
  }
}

export default App;
