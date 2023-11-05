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
// import Address from "./pages/dashboard/address/address";
import Category from "./pages/dashboard/category/category";
// import Contact from "./pages/dashboard/contact/contact";
import About from "./pages/dashboard/about/about";
import Tutorials from "./pages/dashboard/tutorials/tutorials";
import DashboardBody from "./pages/dashboard/DashboardBody/DashboardBody";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dddd",
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
    //   {
    //     icon: <TableCellsIcon {...icon} />,
    //     name: "نشانی ها",
    //     path: "/address",
    //     element: <Address />,
    //   },

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
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "  اهداف سامانه آموزش به بیمار",
        path: "/courses",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "آخرین اخبار",
        path: "/units",
        element: <Profile />,
      }, 
      {
        icon: <BellIcon {...icon} />,
        name: "فواید سیستم الکترونیکی ",
        path: "/unitExcercises",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "سوالات متداول",
        path: "/sections",
        element: <Profile />,
      },


      {
        icon: <BellIcon {...icon} />,
        name: "پیشنهادات",
        path: "/suggestions",
        element: <Profile />,
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
        element: <Profile />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "پاسخ ",
        path: "/answers",
        element: <Profile />,
      },
    //   {
    //     icon: <BellIcon {...icon} />,
    //     name: "تماس باما ",
    //     path: "/contacts",
    //     element: <Contact />,
    //   },
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
