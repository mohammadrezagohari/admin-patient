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
import UnitDropdown from "@/components/units/UnitDropdown";
import { showStory, updateStorys } from "./../../../api/services/story";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
export function ShowStory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState();
  const [mime_type, setMime_type] = useState();
  const [file_size, setFile_size] = useState();
  const [file_url, setFile_url] = useState();
  const [loading, setLoading] = useState(true);

  const intitialValues = {
    title: story?.title,
    priority_order: story?.priority_order,
    file_url: story?.file_url,
    mime_type: story?.mime_type,
    file_size: story?.file_size,
  };

  const showInfoStory = async (id) => {
    const showResult = await showStory(id)
      .then(function (response) {
        setStory(response?.data);
        console.log(story);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoStory(id);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/story/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setStory(response?.data?.data);
  //       console.log(story);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

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
  const editInfoStory = async (id, values) => {
    const editResult = await updateStorys(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);

        navigate("/dashboard/stories");
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
                to={`/dashboard/stories`}
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
                بروزرسانی استوری
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoStory(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/story/update/${id}`,
                  //     {
                  //       title: "w",
                  //       link: "http:\/\/gleichner.com\/optio-perferendis-accusantium-et-inventore",
                  //       priority_order: 24,
                  //       file_url: "http:\/\/www.pagac.info\/qui-consequatur-eos-corrupti-aut-iusto.html",
                  //       mime_type: "bmp",
                  //       file_size: "yltdwnptsiujrjqxzs"
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

                  //     navigate("/dashboard/stories");
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
                      <label className="ml-3">نام فایل:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3"> الویت:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="priority_order"
                        value={values?.priority_order}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block ">file:</label>
                      <input
                        type="file"
                        style={inputStyle}
                        onChange={handleFileChange}
                        // value={values?.file_url}
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
                          // value={file_url}
                          style={inputStyle}
                        />
                        <div className=" w-56 rounded-md border">
                          {/* <img
                        className="w-full rounded-md object-cover"
                        src={values?.file_url}
                        alt="Uploaded File"
                      /> */}
                          <video
                            id="video"
                            className="h-full w-full rounded-md object-cover"
                            controls
                          >
                            <source
                              src={values?.file_url}
                              // src={file_url}
                              type="video/mp4"
                            />
                          </video>
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
                        // value={mime_type}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block ">fileSize :</label>
                      <input
                        Field
                        component="input"
                        readOnly
                        // onChange={handleChange}
                        defaultValue
                        type="text"
                        className="ml-3"
                        name="file_size"
                        style={inputStyle}
                        id="file_size"
                        value={values?.file_size}
                        // value={file_size}
                      />
                    </div>
                    {/* <label className="ml-3"> نوع فایل:</label>
                <Field
                  onChange={handleChange}
                  type="text"
                  disabled
                  className="ml-3"
                  name="mime_type"
                  value={values?.mime_type}
                  style={inputStyle}
                />
                <br></br>
                <label className="ml-3"> ویدیو:</label>
                <video id="video" width="320" height="240" controls>
                  <source src={values?.file_url} type="video/mp4" />
                </video>


                <br></br>
                <label className="ml-3"> فایل ویدیویی جدید:</label>
                <input type="file" id="files"   /> */}
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

export default ShowStory;
