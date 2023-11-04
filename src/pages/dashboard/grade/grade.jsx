import axios from "axios";
import { deleteGrade, getGrade } from "@/api/services/grade";
import React, { useContext, useEffect, useRef, useState } from "react";
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

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { AuthContext } from "@/gard/context/AuthContext";
// import { useSortableContext } from "@/context/SortableContext";

export function Grade() {
  const { userToken } = useContext(AuthContext);

  const listRef = useRef(null);
  // const { updateItems, grades} = useSortableContext();
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getGrade(userToken)
      .then(function (response) {
        setGrades(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
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
  }, [grades]);

  // useEffect(() => {
  //   if (listRef.current) {
  //     const sortable = new Sortable(listRef.current, {
  //       animation: 150,
  //       onSort: (event) => {
  //         const newItems = [...items];
  //         const [movedItem] = newItems.splice(event.oldIndex, 1);
  //         newItems.splice(event.newIndex, 0, movedItem);
  //         updateItems(newItems);
  //       },
  //     });

  //     return () => {
  //       sortable.destroy();
  //     };
  //   }
  // }, [grades, updateItems]);

  //----------------------------------------------------------------

  // FILTERING
  useEffect(() => {
    // Filter data based on the search term
    const filtered = grades.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, grades]);

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

  // const totalItems=sortedData.length;
  // const totalPages = Math.ceil(totalItems/itemsPerPage)
  // const startIndex=(currentPage - 1) * itemsPerPage
  // for (let i = currentPage-3; i <= currentPage+3; i++) {
  //   if (i<1)  continue;
  //   if (i>totalPages) break;
  //   debugger;
  //   pageNumbers.push(i)
  // }

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

  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/grade?count=100", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setGrades(response?.data?.data);
  //       console.log(grades);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const linkStyle = {
    backgroundColor: "#F2F2F2",
    height:"2.75rem",
    color: "#183087",
    marginLeft: "1rem",
    padding: ".625rem",
    borderRadius: "8px",
  };
  const deleteGrades = async (id) => {
    const deleteResult = await deleteGrade(id,userToken)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setGrades(grades.filter((grade) => grade.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.massage);
      });
    return deleteResult;
    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .delete(`https://testato.ir/api/grade/delete/${gradeId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data.data);
    //     setGrades(grades.filter((grade) => grade.id != gradeId));
    //     // return (
    //     //   <div className="flex w-full flex-col gap-2">
    //     //     <Alert color="green">A success alert for showing message.</Alert>
    //     //   </div>
    //     // );
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };

  // SEARCH

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = grades.filter((value) => {
  //     return value.name.toLowerCase().includes(searchWord.toLowerCase());
  //   });
  //   if (searchWord === "") {
  //     setFilteredData(grades);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };
  // const clearInput = () => {
  //   setFilteredData(grades);
  //   setWordEntered("");
  // };

  return (
    <>
      <Card className="-mt-4 rounded-none p-0">
      
        <CardHeader variant="gradient" color="blue" className="mt-0  flex justify-end  h-28 w-full mr-0 items-center  p-6  rounded-none">
          <div className="mt-0 h-11 flex ">
            <input
              className="h-full rounded-md p-1 m-0  pr-2 pl-6 text-gray-900 focus:outline-none"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{backgroundColor: "#F2F2F2"}}
            />

            {/* <div
              className="hover:cursor-pointer"
              onClick={() => handleSort("name")}
            >
              نام
              {sortColumn === "name" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </div> */}
            <div className="py-2">
          <Link
            to={`/dashboard/grades/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت پوستر جدید
          </Link>
        </div>
          </div>
        </CardHeader>
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
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto text-right">
                <thead>
                  <tr>
                    {["#", "نام", "شماره اولویت", "تنظیمات"].map(
                      (el) => (
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
                      )
                    )}
                  </tr>
                </thead>

                <tbody ref={listRef}>
                  {displayedData?.map((grade, key) => {
                    const className = `py-3 px-5 ${
                      key === displayedData.length - 1
                        ? ""
                        : "border-b text-center	 border-blue-gray-50"
                    }`;
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* {key + 1} */}
                            {grade?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {grade?.name}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {grade?.priority}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {grade?.field_id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            to={`/dashboard/grades/show/${grade.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteGrades(grade.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
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
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Grade;
