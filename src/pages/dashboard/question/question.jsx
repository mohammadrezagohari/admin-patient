// import axios from "axios";
// import { getQuestions,deleteQuestion } from "@/api/services/question";
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
//   Chip,
//   Tooltip,
//   Progress,
//   Button,
//   Alert,
// } from "@material-tailwind/react";

// import { Link, useNavigate } from "react-router-dom";

// export function Question() {
//   let [questions, setQuestions] = useState();
//   const navigate = useNavigate();
//   const getDatas = async () => {
//     const result = await getQuestions()
//       .then(function (response) {
//         console.log("response", response);
//         setQuestions(response?.data);
//       })
//       .catch(function (err) {
//         console.log("error", err);
//       });
//     return result;
//   };

//   useEffect(() => {
//     getDatas();
//   }, []);

//   // useEffect(() => {
//   //   const { data } = axios
//   //     .get("https://testato.ir/api/question?count=100", {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       setQuestions(response?.data?.data);
//   //       console.log(questions);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   // }, []);

//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };
//   // function deleteQuestion(questionId) {
//   //   const token = localStorage.getItem("_token_testato");
//   //   const { data } = axios
//   //     .delete(`https://testato.ir/api/question/delete/${questionId}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       console.log(response.data.data);
//   //       setQuestions(questions.filter((question) => question.id != questionId));
//   //       // return (
//   //       //   <div className="flex w-full flex-col gap-2">
//   //       //     <Alert color="green">A success alert for showing message.</Alert>
//   //       //   </div>
//   //       // );
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   // }

//   const deleteQuestions= async (id) => {
//     const deleteResult = await deleteQuestion(id)
//            .then(function (response) {
//         console.log(response?.data);
//         setQuestions(questions.filter((question) => question.id !== id));

//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//     return deleteResult;
//   }

//   return (
//     <>
//       <Card>
//         <div className="py-5">
//           <Link
//             to={`/dashboard/question/create`}
//             className="mr-3"
//             style={linkStyle}
//           >
//             ساخت سوال جدید
//           </Link>
//         </div>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography variant="h6" color="white">
//             لیست سوالات
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px]	   table-auto text-right">
//             <thead>
//               <tr>
//                 {["#","عنوان", "نام درس","فصل","بخش","مقطح","سطح","نوع سوال", "تنظیمات"].map((el) => (
//                   <th
//                     key={el}
//                     className="place-items-center border-b text-center		 border-blue-gray-50 py-3 px-5 "
//                   >
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-bold uppercase text-blue-gray-400"
//                     >
//                       {el}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {questions?.map((question, key) => {
//                 const className = `py-3 px-1 ${
//                   key === questions.length - 1
//                     ? ""
//                     : "border-b text-center	 border-blue-gray-50"
//                 }`;

//                 return (
//                   <tr key={key}>
//                     <td className={className}>
//                       <div className="flex items-center gap-4">{key + 1}</div>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.title}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.course?.title}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.unit?.title}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.section?.title}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.grade?.name}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.level?.title}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {question?.questions_type}
//                       </Typography>
//                     </td>

//                     <td className={className}>

//                         <Link
//                         to={`/dashboard/question/show/${question.id}`}
//                         style={linkStyle}
//                       >
//                         اصلاح
//                       </Link>
//                       <Button
//                         onClick={() => deleteQuestions(question.id)}
//                         className="bg-red-700 text-white  hover:bg-red-800 focus:outline-none"
//                       >
//                         حذف
//                       </Button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>
//     </>
//   );
// }

// export default Question;

import axios from "axios";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Alert,
} from "@material-tailwind/react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { deleteQuestions, getQuestions } from "@/api/services/question";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { AuthContext } from "@/gard/context/AuthContext";
export function Question() {
  const { userToken } = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);
  const listRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getQuestions(userToken)
      .then(function (response) {
        console.log("response", response);
        setQuestions(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
        // console.log(data);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);
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
  }, [questions]);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const deleteQuestion = async (id) => {
    const deleteResult = await deleteQuestions(id, userToken)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setQuestions(questions.filter((question) => question.id !== id));
        // return (
        //   <div className="flex w-full flex-col gap-2">
        //     <Alert color="green">A success alert for showing message.</Alert>
        //   </div>
        // );
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.message);
      });
    return deleteResult;
  };

  //FILTERING

  const menuItems = [...new Set(questions.map((Val) => Val?.grade?.name))];
  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return questions;
    }
    return questions.filter((item) => item.category === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, questions]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  //SEARCHING

  useEffect(() => {
    // Filter data based on the search term
    const filtered = questions?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, questions]);

  //SORTING
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  //PAGINATION

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  //----------------------------------------------------------------
  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/question/create`}
            className="mr-3"
            style={linkStyle}
          >
            ساخت سوال جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست سوالات
          </Typography>
          <div className="mt-2 flex gap-6">
            <input
              className="rounded-md p-1 pr-2 text-gray-900 focus:outline-none"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div
              className="hover:cursor-pointer"
              onClick={() => handleSort("title")}
            >
              نام
              {sortColumn === "title" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </div>
            <div className="rounded-md bg-white px-3 text-gray-900 focus:outline-none">
              <select
                name="category-list"
                id="category-list"
                onChange={handleCategoryChange}
                className="rounded-md p-1"
              >
                <option value="all">همه</option>
                <option value="dahom">دهم</option>
                <option value="yazdahom">یازدهم</option>
                <option value="davazdahom">دوازدهم</option>
              </select>
            </div>
          </div>
        </CardHeader>
        {loading ? (
          <div className=" flex w-full  items-center justify-center py-60">
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
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {[
                      "#",
                      "عنوان",
                      "نام درس",
                      "فصل",
                      "بخش",
                      "مقطح",
                      "سطح",
                      "تنظیمات",
                    ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b border-blue-gray-50		 py-3 px-5 text-center "
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

                <tbody ref={listRef}>
                  {displayedData?.map((question, key) => {
                    const className = `py-3 px-1 ${
                      key === displayedData.length - 1
                        ? ""
                        : "border-b text-center	 border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* {key + 1} */}
                            {question?.id}
                          </div>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.course?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.unit?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.section?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.grade?.name}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {question?.level?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Link
                            to={`/dashboard/question/show/${question.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteQuestion(question.id)}
                            className="bg-red-700 text-white  hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {displayedData.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="my-6 mx-auto mt-10 flex w-full items-center  justify-center gap-3">
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
                  </div>
                </>
              )}

              <Outlet />
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Question;
