import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
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
import { deleteSlider, getSlider } from "@/api/services/slider";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";

export function Slider() {

  const [sliders, setSliders] = useState([]);
  const listRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/slider?count=100", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setSliders(response?.data?.data);
  //       console.log(sliders);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const getDatas = async () => {
    const result = await getSlider()
      .then(function (response) {
        console.log("response", response);
        setSliders(response?.data);
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
  }, [sliders]);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  // function deleteSlider(sliderId) {
  //   const token = localStorage.getItem("_token_testato");
  //   const { data } = axios
  //     .delete(`https://testato.ir/api/slider/delete/${sliderId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data.data);
  //       setSliders(sliders.filter((slider) => slider.id != sliderId));
  //       // return (
  //       //   <div className="flex w-full flex-col gap-2">
  //       //     <Alert color="green">A success alert for showing message.</Alert>
  //       //   </div>
  //       // );
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }

  const deleteSliders = async (id) => {
    const deleteResult = await deleteSlider(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setSliders(sliders.filter((slider) => slider.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return deleteResult;
  };

  useEffect(() => {
    // Filter data based on the search term
    const filtered = sliders?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
      // item.priority_order.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, sliders]);

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
            to={`/dashboard/slider/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت اسلایدر جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست اسلایدر ها
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
            <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {[
                      "#",
                      " نام",
                      "الویت",
                      "حجم فایل",
                      "نوع فایل",
                      "تنظیمات",
                    ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b border-blue-gray-50	 py-3 px-5 text-center "
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
                  {displayedData?.map((slide, key) => {
                    const className = `py-3 px-5 ${
                      key === displayedData.length - 1
                        ? ""
                        : "border-b text-center border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {key + 1}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {slide?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {slide?.priority_order}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {slide?.file_size}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {slide?.mime_type}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Link
                            to={`/dashboard/slider/show/${slide.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteSliders(slide.id)}
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

export default Slider;
