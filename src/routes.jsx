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
// import ShowField from "./pages /dashboard/field/showField";
import Grade from "./pages/dashboard/grade/grade";
import Course from "./pages/dashboard/course/course";
import Unit from "./pages/dashboard/unit/unit";
import Section from "./pages/dashboard/section/section";
import Exam from "./pages/dashboard/exam/exam";
import Level from "./pages/dashboard/level/level";
import Menu from "./pages/dashboard/menu/menu";
import Province from "./pages/dashboard/province/province";
import Slider from "./pages/dashboard/slide/slider";
import Wallet from "./pages/dashboard/wallet/wallet";
import Story from "./pages/dashboard/story/story";
import Question from "./pages/dashboard/question/question";
import UnitExcercise from "./pages/dashboard/unitExcercises/unitExcercise";
import Advertisement from "./pages/dashboard/advertisement/advertisement";
import Answer from "./pages/dashboard/answer/answer";
import Category from "./pages/dashboard/category/category";
import Suggestion from './pages/dashboard/suggestion/suggestion';
import SummaryFormula from "./pages/dashboard/summaryFormula/summaryFormula";
import Contact from "./pages/dashboard/contact/contact";
import PackageCoin from "./pages/dashboard/packageCoin/packageCoin";
import About from "./pages/dashboard/about/about";


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
        path: "/home",
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
        icon: <TableCellsIcon {...icon} />,
        name: "نشانی ها",
        path: "/address",
        element: <Address />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "دسته بندی آموزش ها",
        path: "/schools",
        element: <School />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "جدیدترین آموزش ها",
        path: "/fields",
        element: <Field />,
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
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "سطح ها",
      //   path: "/levels",
      //   element: <Level />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " اطلاعات پایه ",
      //   // path: "/basicInfo",
      //  childrens:[
          
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: "ثبت رشته",
      //       path: "/fields",
      //       element: <Field />,
      //     },
          
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: " مقطع",
      //       path: "/grades",
      //       element: <Grade />,
      //     },
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: " درس ها",
      //       path: "/courses",
      //       element: <Course />,
      //     },
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: "فصل ها",
      //       path: "/units",
      //       element: <Unit />,
      //     }, 
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: "تمرینات فصل ها",
      //       path: "/unitExcercises",
      //       element: <UnitExcercise />,
      //     },
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: "بخش ها",
      //       path: "/basicInfo/sections",
      //       element: <Section />,
      //     },
      //     {
      //       icon: <BellIcon {...icon} />,
      //       name: "سطح ها",
      //       path: "/basicInfo/levels",
      //       element: <Level />,
      //     },
      //   ]
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " امتحانات",
      //   path: "/exams",
      //   element: <Exam />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " منوها",
      //   path: "/menus",
      //   element: <Menu />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " مدیریت استان وشهرستان",
      //   path: "/provinces",
      //   element: <Province />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "نمایش اسلایدها",
      //   path: "/sliders",
      //   element: <Slider />,
      // },

      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "کیف پول",
      //   path: "/wallets",
      //   element: <Wallet />,
      // },


      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "استوری ها",
      //   path: "/stories",
      //   element: <Story />,
      // },

      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "بخش سوالات",
      //   path: "/questions",
      //   element: <Question />,
      //   // children:[
      //   //   {path:"create", element:<CreateQuestion />},
      //   //   {path:"show/:id", element:<ShowQuestion />}      
      //   // ]
      // },
      // {
      //   path: "/questions/create",
      //   element: <CreateQuestion />,
      // },
      // {
      //   path: "/questions/show/:id",
      //   element: <ShowQuestion />,
      // },

      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " سکه ",
      //   path: "/packagecoins",
      //   element: <PackageCoin />,
      // },

      {
        icon: <BellIcon {...icon} />,
        name: "پیشنهادات",
        path: "/suggestions",
        element: <Suggestion />,
      },

      // {
      //   icon: <BellIcon {...icon} />,
      //   name: " خلاصه فرمول ",
      //   path: "/summaryFormulas",
      //   element: <SummaryFormula />,
      // },

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
