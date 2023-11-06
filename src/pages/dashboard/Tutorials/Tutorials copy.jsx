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


const Tutorial11111s = ()=>{
    
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
  

  //   useEffect(() => {
  //       // Filter data based on the search term
  //       const filtered = category_id?.filter((item) =>
  //         item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       setFilteredData(filtered);
  //     }, [searchTerm, category_id]);
  //       // FILTERING


  //     const getCategorys = async () => {
      
  //         const result = await getCategory(category_id)
  //           .then(function (response) {
  //             setCategory_id(response?.data);
  //           })
  //           .catch(function (err) {
  //             console.log("error", err);
  //           });
  //         return result;
          
  //       };


  // const getDatas = async () => {
  // const { userToken } = useContext(AuthContext);

  //   const result = await getCategory(userToken)
  //     .then(function (response) {
  //       setCategory_id(response?.data);
  //     })
  //     .catch(function (err) {
  //       console.log("error", err);
  //     });
  //   setLoading(false);
  //   return result;
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     getDatas();
  //   }, 3000);
  // }, []);
  // useEffect(() => {
  //   if (listRef.current) {
  //     new Sortable(listRef.current, {
  //       animation: 150, // Animation speed
  //       onSort: (event) => {
  //         // Handle sorting logic here
  //         console.log("New order:", event.newIndex);
  //       },
  //       ghostClass: "bg-blue-100",
  //       // handle: '.handle',
  //     });
  //   }
  // }, [category_id]);


  // const linkStyle = {
  //   backgroundColor: "#F2F2F2",
  //   height:"2.75rem",
  //   color: "#183087",
  //   marginLeft: "1rem",
  //   padding: ".625rem",
  //   borderRadius: "8px",
  // };

  // const deleteCategoryList = async (id) => {
  //   const deleteResult = await deleteCategory(id)
  //     .then(function (response) {
  //       toast.success("حذف با موفقیت انجام شد !");
  //       console.log(response?.data);
  //       setCategory_id(category_id.filter((category) => category.id !== id));
  //     })
  //     .catch(function (err) {
  //       toast.error("خطا !! مجددا تلاش نمایید");
  //       console.log("error", err);
  //     });
  //   return deleteResult;
 
  // };

  //----------------------------------------------------------------



  //SORTING
  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (a[sortColumn] < b[sortColumn]) {
  //     return sortDirection === "asc" ? -1 : 1;
  //   }
  //   if (a[sortColumn] > b[sortColumn]) {
  //     return sortDirection === "asc" ? 1 : -1;
  //   }
  //   return 0;
  // });

  // //PAGINATION

  // const totalItems = sortedData.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const displayedData = sortedData.slice(startIndex, endIndex);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  // const handleSort = (column) => {
  //   if (column === sortColumn) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortColumn(column);
  //     setSortDirection("asc");
  //   }
  // };

    
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
            const linkStyle = {
              backgroundColor: "#F2F2F2",
              height:"2.75rem",
              color: "#183087",
              marginLeft: "1rem",
              padding: ".625rem",
              borderRadius: "8px",
            };
            return (
                <>
                  <Card>
                    <header className="w-full h-28 flex items-center pl-5" style={{backgroundColor:'#1E88E5',borderTopLeftRadius:'8px',borderTopRightRadius:'8px'}}>
                      <div className="h-11 w-full flex justify-end  items-center relative">
                      {/* <Typography className="text-themeclr1 absolute right-0 text-xl"></Typography> */}
                        <input
                            className="h-full rounded-md p-1 m-0  pr-2 pl-6 ml-6 text-gray-900 focus:outline-none"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{backgroundColor: "#F2F2F2"}}
                        />
                          <div className="py-2  mt-0">
                             <Link
                                to={`/dashboard/Tutorials/create`}
                                className="flex justify-center items-center text-sm"
                                style={linkStyle}
                            >
                              ثبت آموزش جدید
                              {/* <img src={icon} alt="" /> */}
                            </Link>
                          </div>
                        </div>
                    </header>
                  </Card> 
                </>
    );
  }


export default Tutorial11111s