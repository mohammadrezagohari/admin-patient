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
import StoreSchool from "./pages/dashboard/school/storeSchool.jsx";
import UpdateSchool from "./pages/dashboard/school/updateSchool";
import CreateField from "./pages/dashboard/field/createField";
import CreateGrade from "./pages/dashboard/grade/createGrade";
import ShowGrade from "./pages/dashboard/grade/showGrade";
import CreateCourse from "./pages/dashboard/course/createCourse";
import ShowCourse from "./pages/dashboard/course/showCourse";
import CreateUnit from "./pages/dashboard/unit/createUnit";
import ShowUnit from "./pages/dashboard/unit/showUnit";
import CreateSection from "./pages/dashboard/section/createSection";
import ShowSection from "./pages/dashboard/section/showSection";
import CreateLevel from "./pages/dashboard/level/createLevel";
import ShowLevel from "./pages/dashboard/level/showLevel";
import CreateMenu from "./pages/dashboard/menu/createMenu";
import ShowMenu from "./pages/dashboard/menu/showMenu";
import CreateProvince from "./pages/dashboard/province/createProvince";
import ShowProvince from "./pages/dashboard/province/showProvince";
import ShowCities from "./pages/dashboard/province/showCities";
import ShowCity from "./pages/dashboard/city/showCity";
import CreateCity from "./pages/dashboard/city/createCity";
import ShowField from "./pages/dashboard/field/showField";
import CreateExam from "./pages/dashboard/exam/createExam";
import ShowExam from "./pages/dashboard/exam/showExam";
import CreateSlider from "./pages/dashboard/slide/createSlider";
import ShowSlider from "./pages/dashboard/slide/showSlider";
import CreateWallet from "./pages/dashboard/wallet/createWallet";
import ShowWallet from "./pages/dashboard/wallet/showWallet";
import CreateStory from "./pages/dashboard/story/createStory";
import ShowStory from "./pages/dashboard/story/showStory";
import CreateQuestion from "./pages/dashboard/question/createQuestion";
import ShowQuestion from "./pages/dashboard/question/showQuestion";
import CreateUnitExcercise from "./pages/dashboard/unitExcercises/createUnitExcercise";
import ShowUnitExcercise from "./pages/dashboard/unitExcercises/showUnitExcercise";
import DragDropImg from "./components/dragDropImg/DragDropImg";
import CreateAdvertisement from "./pages/dashboard/advertisement/createAdvertisement";
import ShowAdvertisement from "./pages/dashboard/advertisement/showAdvertisement";
import CreateAnswer from "./pages/dashboard/answer/createAnswer";
import ShowAnswer from "./pages/dashboard/answer/showAnswer";
import CreateCategory from "./pages/dashboard/category/createCategory";
import ShowCategory from "./pages/dashboard/category/showCategory";
import ShowSuggestion from "./pages/dashboard/suggestion/showSuggestion";
import CreateSuggestion from "./pages/dashboard/suggestion/createSuggestion";
import CreateSummaryFormula from "./pages/dashboard/summaryFormula/createSummaryFormula";
import ShowSummaryFormula from "./pages/dashboard/summaryFormula/showSummaryFormula";
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
import CreateContact from "./pages/dashboard/contact/createContact";
import CreateAboutUs from "./pages/dashboard/about/createAbout";
import CreatePackageCoin from "./pages/dashboard/packageCoin/createPackageCoin";
import ShowPackageCoin from "./pages/dashboard/packageCoin/showPackageCoin";
import { Profile, Users } from "./pages/dashboard";
import { useContext } from "react";
import School from "./pages/dashboard/school/school";
import Field from "./pages/dashboard/field/field";
import Grade from "./pages/dashboard/grade/grade";
import Course from "./pages/dashboard/course/course";
import Unit from "./pages/dashboard/unit/unit";
import UnitExcercise from "./pages/dashboard/unitExcercises/unitExcercise";
import Section from "./pages/dashboard/section/section";
import Level from "./pages/dashboard/level/level";
import Question from "./pages/dashboard/question/question";

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
        <div className="top-0 min-h-screen bg-blue-gray-50/50" >
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/pelogo.png"
                : "/img/pelogo.png"
            }
          />
          <div className={`p-4  xl:mr-80 `} >
            <Configurator  />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {/* <Route path="/auth/sign-in" element={<SignIn />} /> */}
              {/* <Route path="/auth/*" element={<Auth />} /> */}
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/sendOtpCode/*" element={<SendOtp />} />
              <Route path="/dashboard/home" element={<Dashboard />} />
              <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
              <Route path="/dashboard/profile/profile" element={<Profile />} />

              <Route
                path="/dashboard/users/panel/:id"
                element={<UserPanel />}
              />

              <Route path="/dashboard/schools" element={<School />} />
              <Route
                path="/dashboard/schools/create"
                element={<StoreSchool />}
              />
              <Route
                path="/dashboard/schools/show/:id"
                element={<UpdateSchool />}
              />

              <Route path="/dashboard/fields" element={<Field />} />
              <Route
                path="/dashboard/fields/create"
                element={<CreateField />}
              />
              <Route
                path="/dashboard/fields/show/:id"
                element={<ShowField />}
              />

              <Route path="/dashboard/grades/" element={<Grade />} />
              <Route
                path="/dashboard/grades/create"
                element={<CreateGrade />}
              />
              <Route
                path="/dashboard/grades/show/:id"
                element={<ShowGrade />}
              />

              <Route path="/dashboard/courses" element={<Course />} />
              <Route
                path="/dashboard/course/create"
                element={<CreateCourse />}
              />
              <Route
                path="/dashboard/course/show/:id"
                element={<ShowCourse />}
              />

              <Route path="/dashboard/units" element={<Unit />} />
              <Route path="/dashboard/unit/create" element={<CreateUnit />} />
              <Route path="/dashboard/unit/show/:id" element={<ShowUnit />} />

              <Route
                path="/dashboard/unitExcercises"
                element={<UnitExcercise />}
              />
              <Route
                path="/dashboard/unitExcercises/create"
                element={<CreateUnitExcercise />}
              />
              <Route
                path="/dashboard/unitExcercises/show/:id"
                element={<ShowUnitExcercise />}
              />

              <Route path="/dashboard/sections" element={<Section />} />
              <Route
                path="/dashboard/section/create"
                element={<CreateSection />}
              />
              <Route
                path="/dashboard/section/show/:id"
                element={<ShowSection />}
              />

              <Route path="/dashboard/levels" element={<Level />} />
              <Route path="/dashboard/level/create" element={<CreateLevel />} />
              <Route path="/dashboard/level/show/:id" element={<ShowLevel />} />

              <Route path="/dashboard/menu/create" element={<CreateMenu />} />
              <Route path="/dashboard/menu/show/:id" element={<ShowMenu />} />

              <Route path="/dashboard/exam/create" element={<CreateExam />} />
              <Route path="/dashboard/exam/show/:id" element={<ShowExam />} />

              <Route
                path="/dashboard/slider/create"
                element={<CreateSlider />}
              />
              <Route
                path="/dashboard/slider/show/:id"
                element={<ShowSlider />}
              />

              <Route
                path="/dashboard/wallet/create"
                element={<CreateWallet />}
              />
              <Route
                path="/dashboard/wallet/show/:id"
                element={<ShowWallet />}
              />

              <Route path="/dashboard/story/create" element={<CreateStory />} />
              <Route path="/dashboard/story/show/:id" element={<ShowStory />} />

              <Route
                path="/dashboard/contact/create"
                element={<CreateContact />}
              />

              <Route
                path="/dashboard/about/create"
                element={<CreateAboutUs />}
              />

              <Route path="/dashboard/questions" element={<Question />} />
              <Route
                path="/dashboard/question/create"
                element={<CreateQuestion />}
              />
              <Route
                path="/dashboard/question/show/:id"
                element={<ShowQuestion />}
              />

              <Route
                path="/dashboard/suggestion/create"
                element={<CreateSuggestion />}
              />
              <Route
                path="/dashboard/suggestion/show/:id"
                element={<ShowSuggestion />}
              />

              <Route
                path="/dashboard/summaryFormula/create"
                element={<CreateSummaryFormula />}
              />
              <Route
                path="/dashboard/summaryFormula/show/:id"
                element={<ShowSummaryFormula />}
              />

              <Route
                path="/dashboard/category/create"
                element={<CreateCategory />}
              />
              <Route
                path="/dashboard/category/show/:id"
                element={<ShowCategory />}
              />

              <Route
                path="/dashboard/advertisement/create"
                element={<CreateAdvertisement />}
              />
              <Route
                path="/dashboard/advertisement/show/:id"
                element={<ShowAdvertisement />}
              />

              <Route
                path="/dashboard/answer/create"
                element={<CreateAnswer />}
              />
              <Route
                path="/dashboard/answer/show/:id"
                element={<ShowAnswer />}
              />

              <Route
                path="/dashboard/province/create"
                element={<CreateProvince />}
              />
              <Route
                path="/dashboard/province/show/:id"
                element={<ShowProvince />}
              />
              <Route
                path="/dashboard/province/:id/cities/show"
                element={<ShowCities />}
              />
              <Route
                path="/dashboard/city/create/:id"
                element={<CreateCity />}
              />
              <Route
                path="/dashboard/province/:province_id/city/show/:city_id"
                element={<ShowCity />}
              />

              {/* <Route
                        path="*"
                        element={<Navigate to="/dashboard/home" replace />}
                      /> */}
            </Routes>
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
