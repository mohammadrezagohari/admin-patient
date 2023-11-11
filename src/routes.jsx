import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  
} from "@heroicons/react/24/solid";
// import { HiNewspaper } from 'react-icons/hi2';

import { Home, Profile, Notifications, Users } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Register from "./pages/auth/register";
import Forget from "./pages/auth/forget";
import Category from "./pages/dashboard/category/category";
import About from "./pages/dashboard/about/about";
import Tutorials from "./pages/dashboard/tutorials/tutorials";
import DashboardBody from "./pages/dashboard/DashboardBody/DashboardBody";
import EducationCovers from "./pages/dashboard/educationCovers/educationCovers";
import SystemBenefit from "./pages/dashboard/systemBenefit/systemBenefit";
import PatientContent from "./pages/dashboard/patientContent/patientContent";
import Questions from "./pages/dashboard/faq/faq";
import Faq from "./pages/dashboard/faq/faq";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "داشبورد",
        path: "/dashboard",
        element: <Home />,
      },
      
      {
        icon: <UserCircleIcon {...icon} />,
        name: "پروفایل",
        path: "/profile/profile",
        element: <Profile />,
      },
      { 
        icon: <TableCellsIcon {...icon} />,
        name: "مدیریت کاربران",
        path: "/users",
        element: <Users />,
      },
 

      {
        icon: <BellIcon {...icon} />,
        name: "آموزش های جدید",
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "مقالات",
        path: "/articles",
        element: <Home />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "ارسال متحوا به کاربر",
        path: "/patientcontent",
        element: <PatientContent />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "دسته بندی ها",
        path: "/categories",
        element: <Category />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: " پوسترهای آموزشی",
        path: "/educationCovers",
        element: <EducationCovers />,
      },
     
      {
        icon: <BellIcon {...icon} />,
        name: "فواید سیستم الکترونیکی ",
        path: "/systembenefit",
        element: <SystemBenefit />,
      },
   
      {
        icon: <BellIcon {...icon} />,
        name: "  اهداف سامانه آموزش به بیمار",
        path: "/patientedubenefit",
        element: <Profile />,
      },
    //   {
    //     icon:<HiNewspaper/>,
    //     name: "آخرین اخبار",
    //     path: "/lastnews",
    //     element: <Profile />,
    //   }, 
      {
        icon: <BellIcon {...icon} />,
        name: "سوالات متداول",
        path: "/faq",
        element: <Faq />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "پیشنهادات",
        path: "/suggestions",
        element: <Profile />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: " درباره ما ",
        path: "/abouts",
        element: <About />,
      },
    ],
  },
  {
    title: "صفحات احراز هویت",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "ثبت نام",
        path: "/register",
        element: <Register />,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "ورود",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "فراموشی رمز عبور",
        path: "/forget",
        element: <Forget />,
      },
      
    ],
  },
];

export default routes;
