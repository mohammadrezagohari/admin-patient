import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { deleteTutorilas, getTutorials } from "@/api/services/tutorial";
// import DataTable from "react-data-table-component";
// import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";


function Tutorials() {
  const { userToken } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [tutorials, setTutorials] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //   const [data, setData] = useState([]);

  const {
    isLoading,
    isError,
    data: apiData,
    // data,
    error,
  } = useQuery(["tutorial_list_data", page], () => getTutorials(page));
  if (isLoading) return <div>Loading... {isLoading}</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (isError) return <div>Error: {error.message}</div>;
  //   console.log(data);
  //   return <div>dadadad</div>;

  //   const getDatas = async () => {
  //     const result = await getTutorials()
  //       .then(function (response) {
  //         console.log("response", response);
  //         setTutorials(response?.data);
  //       })
  //       .catch(function (err) {
  //         console.log("error", err);
  //       });
  //     setLoading(false);
  //     return result;
  //   };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       getDatas();
  //     }, 3000);
  //   }, []);

  useEffect(() => {
    if (apiData) {
    //   setTimeout(() => {
        console.log(apiData?.data);
        setTutorials(apiData?.data);
    //   }, 3000);
    }
  }, [apiData]);

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    // setTutorials(apiData);
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "عنوان اصلی",
      selector: (row) => row.main_title,
      sortable: true,
    },
    {
      name: "دسته بندی",
      selector: (row) => row.category?.name,
    },
    {
      name: "تنظیمات",
      selector: (row) => row.body,
    },
  ];

  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }

  //   const linkStyle = {
  //     backgroundColor: "purple",
  //     color: "white",
  //     marginLeft: "1rem",
  //     padding: "0.5rem",
  //     borderRadius: "8px",
  //   };
  //   const deleteTutorialItem = async (id) => {
  //     const deleteResult = await deleteTutorilas(id, userToken)
  //       .then(function (response) {
  //         if (response.status) {
  //           toast.success("حذف با موفقیت انجام شد !");
  //           setTutorials(tutorials.filter((tutorial) => tutorial.id !== id));
  //         } else {
  //           toast.error("خطا !! مجددا تلاش نمایید");
  //         }
  //       })
  //       .catch(function (err) {
  //         toast.error("خطا !! مجددا تلاش نمایید");
  //         console.log("error", err);
  //       });

  //     return deleteResult;
  //   };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {tutorials && (
        <ThreeDots
          columns={columns}
          data={tutorials}
          pagination={true}
          paginationPerPage={10}
          paginationServer
          onChangePage={handlePageChange}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
  
        />
      )}
    </div>
  );

  //   return (
  //     <>
  //       <Card>
  //         <div className="py-5">
  //           {/* <Link
  //             to={`/dashboard/category/create`}
  //             className="mr-3"
  //             style={linkStyle}
  //           >
  //             ثبت دسته بندی جدید
  //           </Link> */}
  //         </div>
  //         <CardHeader
  //           variant="gradient"
  //           color="blue"
  //           className="mb-8 mt-3 flex justify-between p-6"
  //         >
  //           <Typography variant="h6" color="white">
  //             لیست آموزش ها
  //           </Typography>
  //           <Link
  //             to={`/dashboard/tutorials/create`}
  //             className="mr-3"
  //             style={linkStyle}
  //           >
  //             ثبت آموزش جدید
  //           </Link>
  //         </CardHeader>

  //         {loading ? (
  //           <div className="flex w-full  items-center justify-center py-60">
  //             <ThreeDots
  //               height="80"
  //               width="80"
  //               radius="9"
  //               color="#820382"
  //               ariaLabel="three-dots-loading"
  //               wrapperStyle={{}}
  //               wrapperClassName="mx-auto w-full"
  //               visible={true}
  //             />
  //           </div>
  //         ) : (
  //           <>
  //             <CardBody className="min-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
  //               <table className="w-full min-w-[640px] table-auto text-right">
  //                 <thead>
  //                   <tr>
  //                     {["#", "نام", "دسته بندی", "تنظیمات"].map((el) => (
  //                       <th
  //                         key={el}
  //                         className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
  //                       >
  //                         <Typography
  //                           variant="small"
  //                           className="text-[11px] font-bold uppercase text-blue-gray-400"
  //                         >
  //                           {el}
  //                         </Typography>
  //                       </th>
  //                     ))}
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {tutorials?.map((tutorial, key) => {
  //                     const className = `py-3 px-5 ${
  //                       key === tutorials.length - 1
  //                         ? ""
  //                         : "border-b border-blue-gray-50"
  //                     }`;

  //                     return (
  //                       <tr key={key}>
  //                         <td className={className}>
  //                           <div className="flex items-center gap-4">
  //                             {tutorial?.id}
  //                           </div>
  //                         </td>
  //                         <td className={className}>
  //                           <Typography className="text-xs font-semibold text-blue-gray-600">
  //                             {tutorial?.main_title}
  //                           </Typography>
  //                         </td>
  //                         <td className={className}>
  //                           <Typography className="text-xs font-semibold text-blue-gray-600">
  //                             {tutorial?.category?.name}
  //                           </Typography>
  //                         </td>

  //                         <td className={className}>
  //                           <Link
  //                             to={`/dashboard/tutorial/show/${tutorial.id}`}
  //                             style={linkStyle}
  //                           >
  //                             اصلاح
  //                           </Link>
  //                           <Button
  //                             onClick={() => deleteTutorialItem(tutorial.id)}
  //                             className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
  //                           >
  //                             حذف
  //                           </Button>
  //                         </td>
  //                       </tr>
  //                     );
  //                   })}
  //                 </tbody>
  //               </table>
  //               {tutorials.length == 0 ? (
  //                 <>
  //                   <div className="flex h-[80vh] w-full items-center justify-center">
  //                     <p className="">آیتمی وجود ندارد :(</p>
  //                   </div>
  //                 </>
  //               ) : (
  //                 <></>
  //               )}
  //             </CardBody>
  //           </>
  //         )}
  //       </Card>
  //     </>
  //   );
}

export default Tutorials;
