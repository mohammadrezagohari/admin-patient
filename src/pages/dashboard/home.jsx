// import React, { useContext } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Tooltip,
//   Progress,
// } from "@material-tailwind/react";
// import {
//   ClockIcon,
//   CheckIcon,
//   EllipsisVerticalIcon,
//   ArrowUpIcon,
// } from "@heroicons/react/24/outline";
// import { StatisticsCard } from "@/widgets/cards";
// import { StatisticsChart } from "@/widgets/charts";
// import {
//   statisticsCardsData,
//   statisticsChartsData,
//   projectsTableData,
//   ordersOverviewData,
// } from "@/data";
// import { AuthContext } from "@/gard/context/AuthContext";

// export function Home() {
//   const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
//     useContext(AuthContext);

//   return (
//     <>
//     <div className="mt-12 ">
//       <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <Card className="overflow-hidden xl:col-span-2">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Projects
//               </Typography>
//               <Typography
//                 variant="small"
//                 className="flex items-center gap-1 font-normal text-blue-gray-600"
//               >
//                 <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
//                 <strong>30 done</strong> this month
//               </Typography>
//             </div>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <table className="w-full min-w-[640px] table-auto">
//               <thead>
//                  <tr>
//                   {["companies", "members", "budget", "completion"].map(
//                     (el) => (
//                       <th
//                         key={el}
//                         className="border-b border-blue-gray-50 py-3 px-6 text-left"
//                       >
//                         <Typography
//                           variant="small"
//                           className="text-[11px] font-medium uppercase text-blue-gray-400"
//                         >
//                           {el}
//                         </Typography>
//                       </th>
//                     )
//                   )}
//                 </tr> 
//               </thead>
//               <tbody>
        
//               </tbody>
//             </table>
//           </CardBody>
//         </Card>
//         <Card>
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 p-6"
//           >
//             <Typography variant="h6" color="blue-gray" className="mb-2">
//               Orders Overview
//             </Typography>
//             <Typography
//               variant="small"
//               className="flex items-center gap-1 font-normal text-blue-gray-600"
//             >
//               <ArrowUpIcon
//                 strokeWidth={3}
//                 className="h-3.5 w-3.5 text-green-500"
//               />
//               <strong>24%</strong> this month
//             </Typography>
//           </CardHeader>
//           <CardBody className="pt-0">
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//      {/* <Card className="rounded-4 h-full w-full bg-white">
//       <CardBody className="h-full w-full p-0">
//         <iframe src="https://visual.is/visualizations/LA1kX2s5PEd6b3SBWSCTw4is/embed" width="100%" height="100%" frameborder="0" style={{borderRadius:'8px'}}></iframe>
//       </CardBody>
//     </Card> */}
//     </>
//   );
// }



import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { Formik } from "formik";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CategotyBox from "@/components/CategoryBox/CategoryBox";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { useRef } from "react";

import {
  getArticleCount,
  getCategoryCount,
  getTutorialCount,
  getUserCount,
} from "@/api/services/dashboard";
import { AuthContext } from "@/gard/context/AuthContext";
import { getTutorials } from "@/api/services/tutorial";
import { fetchUsers } from "@/api/services/users";

const Home = () => {

  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(null);
  const [articleQuantity, setArticleQuantity] = useState(null);
  const [userQuantity, setUserQuantity] = useState(null);
  const [tutorialQuantity, setTutorialQuantity] = useState(null);
  const [categoryQuantity, setCategoryQuantity] = useState(null);
  const [tutorials, setTutorials] = useState(null);
  const [users, setUsers] = useState([]);
  const listRef = useRef(null);
  const [imagePreview, setImagePreview] = useState();
  const [isOpentDropDown, setIsOpentDropDown] = useState(null);
 

  const catBoxStyle = {
    border: "1px solid #E9E9E9",
    width: "180px",
    height: "70px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  
  const articleCount = async () => {
    const result = await getArticleCount(userToken)
      .then(function (response) {
        console.log("setArticleQuantity", response);
        setArticleQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  const userCount = async () => {
    const result = await getUserCount(userToken)
      .then(function (response) {
        console.log("setUserQuantity", response);
        setUserQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  const tutorialCount = async () => {
    const result = await getTutorialCount(userToken)
      .then(function (response) {
        console.log("setTutorialQuantity", response);
        setTutorialQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  const categoryCount = async () => {
    const result = await getCategoryCount(userToken)
      .then(function (response) {
        console.log("setCategoryQuantity", response);
        setCategoryQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };


  const getTutorial = async () => {
    const result = await getTutorials()
      .then(function (response) {
        console.log("response", response);
        setTutorials(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getTutorial();
    }, 3000);
  }, []);


  // const getDatas = async () => {
  //   const result = await fetchUsers(userToken)
  //     .then(function (response) {
  //       console.log("response", response);
  //       setUsers(response?.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  //   setLoading(false);
  //   return result;
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     getDatas();
  //     console.log("first");
  //   }, 3000);
  // }, []);

  const openDropDown = (id) => {
    if (isOpentDropDown === id) {
      setIsOpentDropDown(null);
    } else {
      setIsOpentDropDown(id);
    }
    console.log("isOpentDropDown : ", isOpentDropDown);
  };


  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150, // Animation speed
        onSort: (event) => {
          // Handle sorting logic here
          console.log("New order:", event.newIndex);
        },
        ghostClass: "bg-blue-100",
        // handle: '.handle',
      });
    }
  }, [users]);




  useEffect(() => {
    articleCount();
    userCount();
    tutorialCount();
    categoryCount();
  }, []);

  const getDatas = async () => {
    const result = await fetchUsers(userToken)
      .then(function (response) {
        console.log("response", response);
        setUsers(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  // useEffect(() => {
  //   getDatas();
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);



  return (
    <>
    <Card className="rounded-4 h-full w-full bg-white">
      <CardBody className="h-full w-full p-0">
          <label
            id="parentCkeck"
            className="h-26 flex w-full items-center justify-around  overflow-hidden rounded-xl border-2 border-gray-100 p-5 pb-8 "
              >
                  <CategotyBox name={"دسته ها"} src="../img/svgs/Data Set.svg">
                    <div>
                      <div className="p-1">{categoryQuantity}</div>
                    </div>
                  </CategotyBox>
                  <CategotyBox name={"کاربران"} src="../img/svgs/Profile.svg">
                    <div>
                      <div className="p-1">{userQuantity}</div>
                    </div>
                  </CategotyBox>
                  <CategotyBox name={"آموزش ها"} src="../img/svgs/Cards.svg">
                    <div>
                      <div className="p-1">{tutorialQuantity}</div>
                    </div>
                  </CategotyBox>
                  <CategotyBox name={"مقالات"} src="../img/svgs/icons8-news 1.svg">
                    <div>
                      <div className="p-1">{articleQuantity}</div>
                    </div>
                  </CategotyBox>
                 </label> 
            <div className="tutorialLists rounded-xl border-2 border-gray-100 h-46 overflow-hidden mt-4">
                    <section  className="relative h-12 flex items-center pr-4  w-full m-0 bg-hrcolor text-white ">
                      <Typography>
                        لیست آموزش ها
                      </Typography>
                        <span className="absolute left-4  ">
                        <Link to="/dashboard/tutorials" className="flex justify-center" >
                        <Typography>
                            آموزش جدید
                        </Typography>
                        <img src="../img/svgs/add2.svg" alt=""/>
                      </Link>
                      </span>
                    </section>
                    {loading ? (
          <div className="flex w-full  items-center justify-center py-60">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <>
            <CardBody className=" h-44 overflow-y-scroll px-0 pt-0 pb-2">
              <table className="w-full  table-auto text-right">
                <thead>
                  <tr>
                    {["#", "عنوان اصلی"," کاور","مشاهده", ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tutorials?.map((tutorial, key) => {
                    const className = `py-3 px-5 ${
                      key === tutorial.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {" "}
                            {tutorial?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="flex justify-center items-center text-xs font-semibold text-blue-gray-600">
                            {tutorial?.main_title}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="flex justify-center items-center text-xs font-semibold text-blue-gray-600">
                            {tutorial?.main_image}
                            <div className=" h-8 w-8 rounded-md border-2">
                              <img
                                className="h-full w-full rounded-md object-cover"
                                src={imagePreview ?? "../images/no-image.svg"}
                                alt="آپلود عکس"
                              />
                            </div>
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link to='' className="flex justify-center items-center">
                              <img src="../img/svgs/eye.svg" alt=""/>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              { 5 == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
               ) : (
                <></> 
              )} 
            </CardBody>
          </>
        )}
              </div>


              {/* ////////////////////////////////////// */}
         <div className="tutorialLists overflow-y-scroll rounded-xl border-2 border-gray-100 h-48 mt-4">
                    <section className="relative h-12 flex items-center pr-4  w-full m-0 bg-hrcolor text-white ">
                      <Typography>
                        لیست  کاربران
                      </Typography>
                    </section>
                    {loading ? (
          <div className="flex w-full  items-center justify-center py-60 overflow-y-scroll ">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <>
          <CardBody className="px-0 pt-0 pb-2 ">
            <div class=" rounded-xl border-2 border-gray-100 h-46  mt-4">
            <table className="w-full min-w-[640px] min-h-max table-auto text-right">
              <thead className="w-full">
                <tr>
                  {[
                    "#",
                    "عکس",
                    "نام",
                    "جنسیت",
                    "موبایل",
                    "وضعیت",
                    "شهر",
                    "تنظیمات",
                  ].map((el) => (
                    <th
                      key={el}
                      className="place-items-center border-b	 border-blue-gray-50 py-3 px-5 "
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody ref={listRef} className="w-full">
                {users?.map((user, key) => {
                  const className = `py-3 px-5 ${
                    key === users.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={
                              user?.sex == "men"
                                ? "/images/avatar/men.png"
                                : "/images/avatar/women.png"
                            }
                            alt={user?.name}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.first_name + " " + user.last_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.sex == "men" ? "آقا" : "خانم"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.mobile}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.is_enable ? (
                            <i className="fa fa-check bg-green-500 text-white p-2"></i>
                          ) : (
                            <i className="fa fa-close bg-red-500 text-white p-2"></i>
                          )}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.city?.name ?? "تعین نشده"}
                        </Typography>
                      </td>

                      <td className={`relative ${className}`}>
                        <button
                          onClick={() => openDropDown(user.id)}
                    
                          className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                        >
                          <svg
                            className="ml-2.5 h-2.5 w-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                          امکانات
                        </button>

                        {isOpentDropDown === user.id ? (
                          <>
                            <div
                              className="absolute left-0 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                            >
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDelayButton"
                              >
                          
                                <li className="w-full flex justify-center">
                                  <Link
                                    to={`/dashboard/users/edit/${user.id}`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    اصلاح
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Button
                                    onClick={() => deleteUser(user.id)}
                                    className=" flex justify-center w-full rounded-none bg-white px-0 pr-4 text-right text-gray-600 shadow-none hover:bg-gray-100 hover:shadow-none focus:outline-none"
                                  >
                                    حذف
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
           

            {/* <div className="my-6 mx-auto mt-10 flex w-full items-center  justify-center gap-3">
          <button
            className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
              currentPage === 1 ? "opacity-50" : ""
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            قبلی
          </button>
          <span className="p-1">{currentPage}</span>
          <button
            className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
              currentPage === totalPages ? "opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            بعدی
          </button>
        </div> */}
          </CardBody>
        </>
      )}
        
              </div>
            </CardBody>
          </Card>
        </>
  );
};
export default Home;
