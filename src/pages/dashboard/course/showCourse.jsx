import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
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
import { showSingleCourse, updateCourse } from "@/api/services/course";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowCourse() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const { CourseId } = useParams();
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(true);
  const [grade_id, setGrade] = useState([]);
  const [field_id, setField_id] = useState([]);
  // const [background, setBackground] = useState(null);

  const intitialValues = {
    title: course?.title,
    field_id: course?.field_id,
    grade_id: course?.grade_id,
    icon: course?.icon,
    background: course?.background,
    description: course?.description,
  };

  const showInfoCourse = async (id) => {
    const showResult = await showSingleCourse(id, userToken)
      .then(function (response) {
        setCourse(response?.data);
        console.log("course", course);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoCourse(id);
    }, 3000);
  }, []);

  const handleImage = (e) => {
    values.icon = e.target.value;
  };
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
  const editInfoCourse = async (id, values) => {
    const editResult = await updateCourse(id, values, userToken)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.message);
      });

    return editResult;
  };
  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    // const file_url = URL.createObjectURL(file);
    // console.log("file", file);
    // console.log("file_url", file_url);
    // setFile(URL.createObjectURL(e.target.files[0]));
    setIcon(event.target.files[0]);
    console.log("icon", icon);
    // if (file) {
    //   // Create a file URL to display the file
    //   const file_url = URL.createObjectURL(file);

    //   // setFileInfo({
    //   //   file_url,
    //   // });
    // }
  };
  const handleBackgroundFileChange = (event) => {
    // if (event.target.name === 'background') {
    //   setIcon({
    //     background: event.target.files,
    //   });
    //   // console.log(e.target.files);
    // }
    setIcon(event.target.files[0]);
    console.log("background", background);
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
                to={`/dashboard/courses`}
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
                بروزرسانی درس
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                encType="multipart/form-data"
                onSubmit={(values) => {
                  editInfoCourse(values, id);
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                    encType="multipart/form-data"
                  >
                    <div className="">
                      <label className="ml-3 ">نام رشته:</label>
                      <div className={inputStyle}>
                        <FieldDropdown
                          field_id={field_id}
                          setField_id={setField_id}
                          selected_id={field_id}
                        />
                      </div>
                    </div>

                    <div className="">
                      <label className="ml-3 block">نام مقطع:</label>
                      <GradeDropdown grade={grade_id} setGrade={setGrade} field_id={field_id} />
                    </div>

                    <div className="">
                      <label className="ml-3 block">نام درس:</label>
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
                      <label className="ml-3 block"> توضیحات:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="description"
                        value={values?.description}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">file:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          name="icon"
                          accept="image/png,image/jpeg,image/webp,"
                          style={inputStyle}
                          onChange={handleFileChange}
                        />
                        <div className=" h-20 w-36 rounded-md border">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={values?.icon}
                            // src={icon}
                            alt="Uploaded File"
                          />
                        </div>
                        <span className="">
                          {/* {icon} */}
                          {values?.icon}
                        </span>
                      </div>
                    </div>

                    {/* <div className="">
                  <label className="ml-3 block"> بکگراند:</label>
                  <input
                    type="color"
                    style={inputStyle}
                     value={values?.background}
                    //  onChange={e => setBackground(e.target.value)}
                    // value="#ff0000"
                    name="background"
                    id=""
                  />
                  
                </div> */}
                    <div className="">
                      <label className="ml-3 block">بکگراند:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          name="background"
                          accept="image/png,image/jpeg,image/webp,"
                          style={inputStyle}
                          onChange={handleBackgroundFileChange}
                        />
                        <div className=" h-20 w-36 rounded-md border">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={values?.background}
                            // src={icon}
                            alt="Uploaded File"
                          />
                        </div>
                        <span className="">
                          {/* {icon} */}
                          {values?.background}
                        </span>
                      </div>
                    </div>
                    <div className=""></div>

                    <div className="">
                      <Button type="submit" className="mt-4 block">
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

export default ShowCourse;
