// import { useContext, useEffect, useState } from "react";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { getBenefit,createBenefit } from "@/api/services/benefit";
// import { ThreeDots } from "react-loader-spinner";
// import { AuthContext } from "@/gard/context/AuthContext";
// import Select from "react-select";

// export function CreateSystemBenefit() {
//   const { userToken } = useContext(AuthContext);

//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState();
//   const [is_active, setIs_active] = useState();
//   const [selected, setSelected] = useState(null);

//   const handleChange = (selectedOption) => {
//     setSelected(selectedOption);
//     console.log(`Option selected:`, selectedOption);
//   };

//   const inputStyle = {
//     border: "1px solid gray",
//     borderRadius: "5px",
//     padding: "0.45rem",
//     textAlign: "center",
//     width: "100%",
//     marginTop: "1rem",
//   };
//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };



//   const storeSysBenefit = async (e) => {
//     e.preventDefault();
//     const createResult = await createBenefit(
//       {
//       title:title,
//       is_active:is_active
//     }, userToken)
//       .then(function (response) {
//         console.log('dataresult', response)
//         if (response.status) {
//           toast.success(" دسته بندی با موفقیت افزوده شد !");
//         } else {
//           if (response?.success == false) {
//             toast(
//               `${
//                 response?.title != undefined ? response?.title : ""
//               } \n
//                   ${
//                     response?.is_active != undefined
//                       ? response?.is_active
//                       : ""
//                   } \n`,
//               {
//                 duration: 2000,
//               }
//             );
//           }
//           toast.error("خطایی رخ داده است");
//         }
//         console.log(response);
//         // navigate(-1);
//       })
//       .catch(function (error) {
//         toast.error("خطا !! مجددا تلاش نمایید");
//         console.log("error :", error);
//         console.log(data);
//       });

//     return createResult;
//   };
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);
//   return (
//     <>
//       {loading ? (
//         <div className="flex items-center justify-center py-60">
//           <ThreeDots
//             height="80"
//             width="80"
//             radius="9"
//             color="#4fa94d"
//             ariaLabel="three-dots-loading"
//             wrapperStyle={{}}
//             wrapperClassName=""
//             visible={true}
//           />
//         </div>
//       ) : (
//         <Card>
//           <div className="py-5">
//             <Link
//               to={`/dashboard/categories`}
//               className="mr-3"
//               style={linkStyle}
//             >
//               بازگشت
//             </Link>
//           </div>
//           <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//             <Typography variant="h6" color="white">
//               ساخت عنوان جدید
//             </Typography>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <form
//               method="post"
//               // onSubmit={storeCategory}
//               className="m-6 mb-4 flex flex-wrap"
//             >
//               <div className="w-7/12">
//                 <label className="ml-3"> عنوان فواید </label>
//                 <textarea
//                   onChange={(e) => setTitle(e.target.value)}
//                   value={title}
//                   type="text"
//                   className="ml-3"
//                   name="name"
//                   style={inputStyle}
//                 /> 
//               </div>

//                  <div className="-mt-5">
//                           <label htmlFor="isActive">وضعیت نمایش</label>
//                           <Select
//                             id="isActive"
//                             className=""
//                             onChange={handleChange} autoFocus={true}
//                             defaultValue={is_active}
//                             options={[
//                               {
//                                 value: true,
//                                 label: "فعال",
//                               },
//                               {
//                                 value: false,
//                                 label: "غیرفعال",
//                               },
//                             ]}
//                           />
//                     </div>
//               <div className="col-span-2 mt-4 w-6/12">
//                 <Button type="submit">ذخیره</Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       )}
//     </>
//   );
// }

// export default CreateSystemBenefit;
