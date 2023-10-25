// import axios from "axios";

// import React, { useState } from "react";

// import {
//     Card,
//     CardHeader,
//     CardBody,

//     Button,
//     Typography,
//   } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { createSchool } from "@/api/services/school";

// export function storeSchool() {
//     const navigate = useNavigate();

//   const [school, setSchool] = useState();

//   const inputStyle = {
//     border: "1px solid gray",
//     borderRadius: "5px",
//     padding: "0.45rem",
//     textAlign: "center",
//   };
//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };
//   const handleSchool = (e) => {
//     setSchool(e.target.value);
//   };

//   // function storeSchool(e) {
//   //   e.preventDefault();
//   //   const token = localStorage.getItem("_token_testato");
//   //   const { data } = axios
//   //     .post(
//   //       "https://testato.ir/api/school/store",
//   //       {
//   //         name: school,
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Accept": "application/json",
//   //           "Authorization": `Bearer ${token}`,
//   //         },
//   //       }
//   //     )
//   //     .then(function (response) {
//   //       console.log(response);
//   //       navigate(-1);

//   //    })
//   //     .catch(function (error) {
//   //       console.log(data);
//   //     });
//   // }

//   const storeSchool = async (e) => {
//     e.preventDefault();

//     const createResult = await createSchool(name)
//       .then(function (response) {
//         console.log(response);
//         navigate(-1);
//       })
//       .catch(function (error) {
//         console.log(data);
//       });
//     return createResult;
//   };

//   return (
//     <>
//       <Card>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography variant="h6" color="white">
//             ساخت مدرسه جدید
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <Link to={"/dashboard/schools"} className="mr-3" style={linkStyle}>
//             بازگشت
//           </Link>

//           <form method="post" onSubmit={storeSchool} className="m-6">
//             <label className="ml-3">نام مدرسه</label>
//             <input
//               onChange={(e) => handleSchool(e)}
//               type="text"
//               className="ml-3"
//               style={inputStyle}
//             />
//             <Button type="submit">ذخیره</Button>
//           </form>
//         </CardBody>
//       </Card>
//     </>
//   );
// }

// export default storeSchool;
// export function School() {
//   let [schools, setSchool] = useState();
//   useEffect(() => {
//     const { data } = axios
//       .get("https://testato.ir/api/school", {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//         },
//       })
//       .then(function (response) {
//         setSchool(response?.data?.data);
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//   }, []);

//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };
//   function deleteSchool(schoolId){
//     const token = localStorage.getItem("_token_testato");
//     const { data } = axios
//       .delete(`https://testato.ir/api/school/delete/${schoolId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(function (response) {
//         console.log(response.data.data);

//         Navigate("/dashboard/schools");
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//   }
//   return (
//     <>
//       <Card>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography  variant="h6" color="white">
//             لیست مدارس
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px]	   table-auto text-right">
//             <thead>
//             <Link to={`/dashboard/schools/store`} className="mr-3"  style={linkStyle}>ثبت مدرسه جدید</Link>

//               <tr>

//                 {["#", "نام", "تنظیمات"].map((el) => (
//                   <th
//                     key={el}
//                     className="place-items-center border-b	 border-blue-gray-50 py-3 px-5 "
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
//               {schools?.map((school, key) => {
//                 const className = `py-3 px-5 ${
//                   key === schools.length - 1
//                     ? ""
//                     : "border-b border-blue-gray-50"
//                 }`;

//                 return (
//                   <tr key={key}>
//                     <td className={className}>
//                       <div className="flex items-center gap-4">
//                         {key+1}
//                       </div>
//                     </td>
//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {school?.name}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Link
//                         to={`/dashboard/schools/show/${school.id}`}
//                         style={linkStyle}
//                       >
//                         اصلاح
//                       </Link>
//                       <Button
//                         onClick={() => deleteSchool(school.id)}
//                         className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
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

//-------------------------------------------------------------------------------------

import axios from "axios";
import React, { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createSchool } from "@/api/services/school";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function CreateGrade() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const handleName = (e) => {
    setName(e.target.value);
  };

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const storeSchool = async (e) => {
    e.preventDefault();

    const createResult = await createSchool(name)
      .then(function (response) {
        toast.success("مدرسه با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(data);
      });
    return createResult;

    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .post(
    //     "https://testato.ir/api/grade/store",
    //     {
    //       name: name,
    //       priority: priority,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     navigate(-1);
    //   })
    //   .catch(function (error) {
    //     console.log(data);
    //   });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <Card className="min-h-screen">
            <div className="py-5">
              <Link to={`/dashboard/scools`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت مدرسه جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2 ">
              <form method="post" onSubmit={storeSchool} className="m-6">
                <label className="ml-3 block">نام مدرسه:</label>
                <input
                  onChange={(e) => handleName(e)}
                  type="text"
                  className="ml-3 my-3"
                  name="name"
                  style={inputStyle}
                />

                <div className="">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateGrade;
