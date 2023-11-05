// import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { getTutorials } from "@/api/services/tutorial";
import { AuthContext } from "@/gard/context/AuthContext";
import { getCategory,deleteCategory } from "@/api/services/category";
import { useRef } from "react";


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
// import { Link } from "react-router-dom";
import './tutorials.css';


const Tutorials = ()=>{
    
    const { userToken } = useContext(AuthContext);
    const cateBoxRef = useRef();
    const [category_id,setCategory_id] = useState();
    const listRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  

    useEffect(() => {
        // Filter data based on the search term
        const filtered = category_id?.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      }, [searchTerm, category_id]);
        // FILTERING


      const getCategorys = async () => {
      
          const result = await getCategory(category_id)
            .then(function (response) {
              setCategory_id(response?.data);
            })
            .catch(function (err) {
              console.log("error", err);
            });
          return result;
          
        };


  const getDatas = async () => {
  const { userToken } = useContext(AuthContext);

    const result = await getCategory(userToken)
      .then(function (response) {
        setCategory_id(response?.data);
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
  }, [category_id]);


  const linkStyle = {
    backgroundColor: "#F2F2F2",
    height:"2.75rem",
    color: "#183087",
    marginLeft: "1rem",
    padding: ".625rem",
    borderRadius: "8px",
  };

  const deleteCategoryList = async (id) => {
    const deleteResult = await deleteCategory(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setCategory_id(category_id.filter((category) => category.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return deleteResult;
 
  };

  //----------------------------------------------------------------



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

    
            {/* <Card style={{height:'570px'}}>
                <Header title={"دسته بندی مورد نظر را انتخاب کنید"} buttonValue={"دسته بندی"} icon="../img/svgs/add.svg"/>
                <div  className="container flex flex-col w-full mt-4 ">
                    <div ref={cateBoxRef} className="border-2 border-gray-100 grid grid-cols-5 gap-x-0 gap-y-6  pb-8 p-5 w-full h-80 overflow-y-scroll overflow-x-hidden " >
                        {category.map(
                            (el) => (
                            <CategotyBox key={el.id} name={el.name} src={el.src}/>
                            )
                        
                        )}
                    </div>
                    <div className="more w-full flex justify-end pl-12 pt-20">
                        <Link
                            to={`/dashboard/Tutorials/create`}
                            className="flex justify-center items-center text-sm"
                            style={linkStyle}
                        >
                        ادامه
                        </Link>
                    </div>

                
                </div> 
            </Card>*/}
           
            return (
                <>
                <Card className="-mt-4 rounded-none p-0">
                    <CardHeader variant="gradient" color="blue" className="flex justify-end  h-28 w-full mr-0 items-center mt-0 p-6  rounded-none" >
                    <div className="h-11 flex">
                        <input
                        className="h-full rounded-md p-1 m-0  pr-2 pl-6 text-gray-900 focus:outline-none"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{backgroundColor: "#F2F2F2"}}
                        />
                   
                        <div className="py-2  mt-0">
                        <Link
                            to={`/dashboard/tutorial/create`}
                            className=""
                            style={linkStyle}
                        >
                            ثبت آموزش جدید
                        </Link>
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
                        <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto text-right">
                            <thead className="w-full">
                            <tr>
                                {["#", "نام", "تنظیمات"].map((el) => (
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

                            <tbody  ref={listRef} className="w-full">
                            {displayedData?.map((category, key) => {
                                const className = `py-3 px-5 ${
                                key === displayedData.length - 1
                                    ? ""
                                    : "border-b text-center border-blue-gray-50"
                                }`;

                                return (
                                <tr key={key}>
                                    <td className={className}>
                                    <div className="flex items-center gap-4">
                                        {/* {key + 1} */}
                                        {category?.id}
                                    </div>
                                    </td>
                                    <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {category?.name}
                                    </Typography>
                                    </td>

                                    <td className={className}>
                                    {/* <Link
                                        to={`/dashboard/Tutorials/${category.id}`}
                                        style={linkStyle}
                                    >
                                        اصلاح
                                    </Link> */}
                                    <Button
                                        onClick={() => deleteCategory(category.id)}
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
                                <p className="">آیتمی وجود ندارد </p>
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


export default Tutorials