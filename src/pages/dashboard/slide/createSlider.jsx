// import axios from "axios";

// import React, { useState } from "react";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";

// export function CreateSlider() {
//   const navigate = useNavigate();

//   const [name, setName] = useState();
//   const [priority, setPriority] = useState();

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

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       priority_order: "",
//       file_url: "",
//       // file_url: "",
//       // mime_type: "",
//       // file_size: "",
//     },
//     onSubmit: (values) => {
//       let image = document.getElementById("file").files[0];
//       console.log("image", image.type);
//       const token = localStorage.getItem("_token_testato");

//       const { data } = axios
//         .post(
//           "https://testato.ir/api/slider/store",
//           {
//             title: values?.title,
//             priority_order: values?.priority_order,
//             file_url: values?.file_url,
//             mime_type: image?.type,
//             file_size: image?.size,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then(function (response) {
//           console.log(response.data.data);
//           // return (
//           //   <div className="flex w-full flex-col gap-2">
//           //     <Alert color="green">A success alert for showing message.</Alert>
//           //   </div>
//           // );
//         })
//         .catch(function (error) {
//           console.log(error.message);
//         });
//     },
//   });
//   return (
//     <>
//       <Card>
//         <div className="py-5">
//           <Link to={`/dashboard/sliders`} className="mr-3" style={linkStyle}>
//             بازگشت
//           </Link>
//         </div>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography variant="h6" color="white">
//             ساخت اسلایدر جدید
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <form method="post" onSubmit={formik.handleSubmit} className="m-6">
//             <label className="ml-3">نام اسلایدر:</label>
//             <input
//               id="title"
//               onChange={formik.handleChange}
//               value={formik.values.title}
//               type="text"
//               className="ml-3"
//               name="title"
//               style={inputStyle}
//             />

//             <label className="ml-3">الویت:</label>
//             <input
//               id="priority_order"
//               name="priority_order"
//               onChange={formik.handleChange}
//               value={formik.values.priority_order}
//               type="text"
//               className="ml-3"
//               style={inputStyle}
//             />

//             <label className="ml-3"> فایل:</label>
//             <input
//               id="file"
//               name="file_url"
//               onChange={formik.handleChange}
//               value={formik.values.file_url}
//               type="file"
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

// export default CreateSlider;

////-------------------------------------------------------------------

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createGrade } from "@/api/services/grade";
import { createSlider } from "@/api/services/slider";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function CreateSlider() {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [priority_order, setPriority_order] = useState();
  // const [fileInfo, setFileInfo] = useState({
  //   mime_type: "",
  //   file_size: "",
  //   file_url: "",
  // });
  const [mime_type, setMime_type] = useState();
  const [file_size, setFile_size] = useState();
  const [file_url, setFile_url] = useState();
  const [loading, setLoading] = useState(true);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
    width: "100%",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Get the MIME type
  //     const mime_type = file.type;
  //     // Get the file size
  //     const file_size = file.size;
  //     // Create a file URL to display the file
  //     const file_url = URL.createObjectURL(file);

  //     setFileInfo({
  //       mime_type,
  //       file_size,
  //       file_url,
  //     });
  //   }
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Get the MIME type
      const mime_type = file.type;
      // Get the file size
      const file_size = file.size;
      // Create a file URL to display the file
      // const file_url = URL.createObjectURL(file);

      setMime_type(mime_type);
      setFile_size(file_size);
      setFile_url(file);
      // setFileInfo({
      //   mime_type,
      //   file_size,
      //   file_url,
      // });
    }
  };

  const storeSlider = async (e) => {
    console.log("Slider loaded successfully");
    e.preventDefault();
    const createResult = await createSlider(
      title,
      priority_order,
      mime_type,
      file_size,
      file_url
    )
      .then(function (response) {
        toast.success(" اسلایدر جدید با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
      });
    return createResult;
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
              <Link
                to={`/dashboard/sliders`}
                className="mr-3"
                style={linkStyle}
              >
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت اسلایدر جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeSlider}
                encType="multipart/form-data"
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">نام اسلایدر:</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">الویت:</label>
                  <input
                    onChange={(e) => setPriority_order(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="priority_order"
                    style={inputStyle}
                  />
                </div>

                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">file:</label>
                  <input
                    type="file"
                    name="file_url"
                    // accept="image/png,image/jpeg,image/webp,"
                    // accept=".jpg, .jpeg, .png, .bmp, .tiff"
                    style={inputStyle}
                    onChange={handleFileChange}
                  />
                </div>

                {/* <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">fileURL :</label>
                  <div className="flex items-center gap-2">
                    <input
                      // onChange={(e) => setFile_url(e.target.value)}
                      readOnly
                      type="text"
                      className="ml-3"
                      name="file_url"
                      value={file_url}
                      style={inputStyle}
                    />
                    <div className=" w-36 rounded-md border">
                      <img
                        className="w-full rounded-md object-cover"
                        src={file_url}
                        alt="Uploaded File"
                      />
                    </div>
                  </div>
                </div> */}

                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2"> mimeType :</label>
                  <input
                    // onChange={(e) => setFile_url(e.target.value)}
                    readOnly
                    defaultValue
                    type="text"
                    className="ml-3"
                    name="mime_type"
                    style={inputStyle}
                    id="file"
                    value={mime_type}
                  />
                </div>

                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">fileSize :</label>
                  <input
                    // onChange={(e) => setFile_url(e.target.value)}
                    readOnly
                    defaultValue
                    type="text"
                    className="ml-3"
                    name="mime_type"
                    style={inputStyle}
                    id="file"
                    value={file_size}
                  />
                </div>
                <div className="col-span-2">
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

export default CreateSlider;
