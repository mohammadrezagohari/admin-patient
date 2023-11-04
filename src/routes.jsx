import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Users } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Register from "./pages/auth/register";
import Forget from "./pages/auth/forget";
import School from "./pages/dashboard/school/school";
import Address from "./pages/dashboard/address/address";
import Field from "./pages/dashboard/field/field";
import Grade from "./pages/dashboard/grade/grade";
import Course from "./pages/dashboard/course/course";
import Unit from "./pages/dashboard/unit/unit";
import Section from "./pages/dashboard/section/section";

import UnitExcercise from "./pages/dashboard/unitExcercises/unitExcercise";
import Advertisement from "./pages/dashboard/advertisement/advertisement";
import Answer from "./pages/dashboard/answer/answer";
import Category from "./pages/dashboard/category/category";
import Suggestion from './pages/dashboard/suggestion/suggestion';
import SummaryFormula from "./pages/dashboard/summaryFormula/summaryFormula";
import Contact from "./pages/dashboard/contact/contact";
import PackageCoin from "./pages/dashboard/packageCoin/packageCoin";
import About from "./pages/dashboard/about/about";
import Tutorials from "./pages/dashboard/Tutorials/Tutorials";
import DashboardBody from "./pages/dashboard/DashboardBody.jsx/DashboardBody";

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
        element: <DashboardBody />,
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
        icon: <TableCellsIcon {...icon} />,
        name: "نشانی ها",
        path: "/address",
        element: <Address />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "آموزش های جدید",
        path: "/tutorials",
        element: <Tutorials />,
      },
      
      {
        icon: <BellIcon {...icon} />,
        name: " پوسترهای آموزشی",
        path: "/grades",
        element: <Grade />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "  اهداف سامانه آموزش به بیمار",
        path: "/courses",
        element: <Course />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "آخرین اخبار",
        path: "/units",
        element: <Unit />,
      }, 
      {
        icon: <BellIcon {...icon} />,
        name: "فواید سیستم الکترونیکی ",
        path: "/unitExcercises",
        element: <UnitExcercise />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "سوالات متداول",
        path: "/sections",
        element: <Section />,
      },


      {
        icon: <BellIcon {...icon} />,
        name: "پیشنهادات",
        path: "/suggestions",
        element: <Suggestion />,
      },
   
      {
        icon: <BellIcon {...icon} />,
        name: "دسته بندی ها",
        path: "/categories",
        element: <Category />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "تبلیغات ",
        path: "/advertisements",
        element: <Advertisement />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "پاسخ ",
        path: "/answers",
        element: <Answer />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "تماس باما ",
        path: "/contacts",
        element: <Contact />,
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
