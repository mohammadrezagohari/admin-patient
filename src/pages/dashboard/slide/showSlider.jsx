import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { showSliders, updateSlider } from "@/api/services/slider";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowSlider() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [slider, setSlider] = useState();
  const [mime_type, setMime_type] = useState();
  const [file_size, setFile_size] = useState();
  const [file_url, setFile_url] = useState();
  const [loading, setLoading] = useState(true);
  // const [fileInfo, setFileInfo] = useState({
  //   mime_type: "",
  //   file_size: "",
  //   file_url: "",
  // });
  const intitialValues = {
    title: slider?.title,
    priority_order: slider?.priority_order,
    mime_type: slider?.mime_type,
    file_size: slider?.file_size,
    file_url: slider?.file_url,
    // fileInfo: slider?.fileInfo,
  };
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/slider/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setSlider(response?.data?.data);
  //       // console.log(slider);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const showInfoSlider = async (id) => {
    const showResult = await showSliders(id)
      .then(function (response) {
        setSlider(response?.data);
        console.log(slider);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    setTimeout(() => {
      showInfoSlider(id);
    }, 3000);
  }, []);

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

  // const image = document.getElementById("file").files[0];
  // const formData=new FormData(image)
  // formData.append();
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
  //   console.log("file : ",file.type);
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Get the MIME type
      const mime_type = file.type;
      // Get the file size
      const file_size = file.size;
      // Create a file URL to display the file
      const file_url = URL.createObjectURL(file);

      setMime_type(mime_type);
      setFile_size(file_size);
      setFile_url(file_url);
      // setFileInfo({
      //   mime_type,
      //   file_size,
      //   file_url,
      // });
    }
  };

  const editInfoSlide = async (id, values) => {
    const editResult = await updateSlider(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
        // navigate("/dashboard/sliders");
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return editResult;
  };

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
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی اسلاید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  // alert("hi");
                  editInfoSlide(id, values);
                  // let image = document.getElementById("file").files[0];
                  // console.log("image", image.type);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/slider/update/${id}`,
                  //     {
                  //       title: values.title,
                  //       priority_order: values.priority_order,
                  //       file_url: values?.file,
                  //       mime_type: image?.type,
                  //       file_size: image?.size,
                  //     },
                  //     {
                  //       headers: {
                  //         "Content-Type": "application/json",
                  //         Accept: "application/json",
                  //         Authorization: `Bearer ${localStorage.getItem(
                  //           "_token_testato"
                  //         )}`,
                  //       },
                  //     }
                  //   )
                  //   .then(function (response) {
                  //     console.log(response.data.message);

                  //     navigate("/dashboard/sliders");
                  //   })
                  //   .catch(function (error) {
                  //     console.log(data);
                  //   });
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3 block">نام اسلایدر:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">الویت:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="priority_order"
                        value={values?.priority_order}
                        style={inputStyle}
                        label="مقطع"
                      />
                    </div>
                    <div className="">
                      <label className="ml-3 block ">file:</label>
                      <input
                        type="file"
                        style={inputStyle}
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block ">fileURL :</label>
                      <div className="flex items-center gap-2">
                        <Field
                          component="input"
                          readOnly
                          type="text"
                          className="ml-3"
                          name="file_url"
                          value={values?.file_url}
                          style={inputStyle}
                        />
                        <div className=" w-36 rounded-md border">
                          <img
                            className="w-full rounded-md object-cover"
                            src={values?.file_url}
                            alt="Uploaded File"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label className="ml-3 block "> mimeType :</label>
                      <Field
                        component="input"
                        readOnly
                        type="text"
                        className="ml-3"
                        name="mime_type"
                        style={inputStyle}
                        id="mime_type"
                        value={values?.mime_type}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block ">fileSize :</label>
                      <input
                        Field
                        component="input"
                        // readOnly
                        onChange={handleChange}
                        // defaultValue
                        type="text"
                        className="ml-3"
                        name="file_size"
                        style={inputStyle}
                        id="file_size"
                        value={values?.file_size}
                      />
                    </div>
                    {/* <div>
                  <img src={values?.file_url} alt="image" width="200px" />
                </div>

                <div className="m-3 w-80">
                
                  <Field
                    className="border-neutral-300 text-neutral-700 file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none"
                    component="input"
                    onChange={handleChange}
                    type="file"
                    style={inputStyle}
                    label=" فایل جدید"
                    name=""
                    // value={value}
                  />
                </div> */}

                    <div className="">
                      <Button type="submit" className="mt-4">
                        ذخیره
                      </Button>
                    </div>
                    {errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default ShowSlider;
